<script setup lang="ts">
import axios from 'axios'
import { filesize } from 'filesize'
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import ButtonGroup from '../button-group/index.vue'
import Button from '../button/index.vue'
import Icon from '../icon/index.vue'

defineOptions({
  name: 'BuiltInFileUpload',
})

const props = withDefaults(defineProps<{
  action?: string
  method?: string
  headers?: Headers | Record<string, any>
  data?: Record<string, any>
  name?: string
  afterUpload?: (response: any) => string | Promise<string>
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  httpRequest?: (options: FileUploadRequestOptions) => any | Promise<any>
  multiple?: boolean
  max?: number
  directory?: boolean
  disabled?: boolean
  description?: string
}>(), {
  action: '',
  method: 'post',
  headers: () => ({}),
  data: () => ({}),
  name: 'file',
  multiple: false,
  max: 0,
  directory: false,
  disabled: false,
  description: '拖放或点击上传',
})

const emits = defineEmits<{
  onSuccess: [response: any, file: File]
  onClick: [fileItem: FileItem, index: number]
}>()

const fileList = defineModel<FileItem[]>('modelValue', { required: true })

export interface FileItem {
  name: string
  size: number
  url?: string
  status?: 'uploading' | 'success' | 'error'
  progress?: number
  file?: File
}

export interface FileUploadRequestOptions {
  action: string
  method: string
  headers: Headers | Record<string, any>
  data: Record<string, any>
  name: string
  file: File
  onProgress: (percent: number) => void
}

const containerRef = useTemplateRef<HTMLElement>('containerRef')
const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef')
const isDragging = ref(false)
const isHoveringContainer = ref(false)
const isContainerFocused = ref(false)
const isMaxReached = computed(() => props.max > 0 && fileList.value.length >= props.max)
const canHandlePaste = computed(() =>
  !props.disabled
  && !isMaxReached.value
  && !props.directory
  && (isHoveringContainer.value || isContainerFocused.value),
)

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  if (props.disabled || isMaxReached.value) {
    return
  }
  isDragging.value = true
}

function handleDragLeave(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  if (props.disabled || isMaxReached.value) {
    return
  }
  isDragging.value = false
  if (e.dataTransfer?.files) {
    handleFiles(e.dataTransfer.files)
  }
}

function onPaste(e: ClipboardEvent) {
  if (e.defaultPrevented || !canHandlePaste.value) {
    return
  }
  const filesFromItems = [...(e.clipboardData?.items ?? [])]
    .filter(item => item.kind === 'file')
    .map(item => item.getAsFile())
    .filter((file): file is File => file !== null)
  const files = filesFromItems.length > 0
    ? filesFromItems
    : [...(e.clipboardData?.files ?? [])]

  if (files.length > 0 && handleFiles(files)) {
    e.preventDefault()
  }
}

function onContainerFocusIn() {
  isContainerFocused.value = true
}

function onContainerFocusOut(e: FocusEvent) {
  const nextFocusedElement = e.relatedTarget
  if (nextFocusedElement instanceof Node && containerRef.value?.contains(nextFocusedElement)) {
    return
  }
  isContainerFocused.value = false
}

onMounted(() => {
  window.addEventListener('paste', onPaste)
})

onUnmounted(() => {
  window.removeEventListener('paste', onPaste)
})

function onSelectFile(files: FileList | File[] | null) {
  handleFiles(files)
}

function handleFiles(files: FileList | File[] | null) {
  if (!files || props.disabled || isMaxReached.value) {
    return false
  }
  const selectedFiles = [...files].filter(file => file instanceof File)
  const remain = props.max > 0 ? props.max - fileList.value.length : selectedFiles.length
  if (remain <= 0) {
    return false
  }
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
  const filesToAdd = selectedFiles.slice(0, remain)
  if (filesToAdd.length === 0) {
    return false
  }
  filesToAdd.forEach((file) => {
    void uploadFile(file)
  })
  return true
}

function getHeadersObject(headers: Headers | Record<string, any>) {
  if (!(headers instanceof Headers)) {
    return { ...headers }
  }
  const headersObj: Record<string, any> = {}
  headers.forEach((value, key) => {
    headersObj[key] = value
  })
  return headersObj
}

async function defaultHttpRequest(options: FileUploadRequestOptions) {
  const formData = new FormData()
  Object.entries(options.data).forEach(([key, value]) => {
    formData.append(key, value)
  })
  formData.append(options.name, options.file)
  const response = await axios({
    url: options.action,
    method: options.method,
    headers: getHeadersObject(options.headers),
    data: formData,
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        options.onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
      }
    },
  })
  return response.data
}

async function uploadFile(file: File, index?: number) {
  const canUpload = await props.beforeUpload?.(file)
  if (canUpload === false) {
    return
  }

  if (index === undefined) {
    fileList.value.push({
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
      file,
    })
  }
  const currentFileIndex = index ?? fileList.value.length - 1
  try {
    const response = await (props.httpRequest ?? defaultHttpRequest)({
      action: props.action,
      method: props.method,
      headers: props.headers,
      data: props.data,
      name: props.name,
      file,
      onProgress: (percent) => {
        fileList.value[currentFileIndex].progress = percent
      },
    })
    const url = await props.afterUpload?.(response)
    if (url) {
      fileList.value[currentFileIndex].url = url
    }
    emits('onSuccess', response, file)
    fileList.value[currentFileIndex].status = 'success'
  }
  catch {
    fileList.value[currentFileIndex].status = 'error'
  }
}

function removeFile(idx: number) {
  fileList.value.splice(idx, 1)
}
</script>

<template>
  <div
    ref="containerRef"
    class="space-y-2"
    :tabindex="props.disabled ? undefined : 0"
    @mouseenter="isHoveringContainer = true"
    @mouseleave="isHoveringContainer = false"
    @focusin="onContainerFocusIn"
    @focusout="onContainerFocusOut"
  >
    <button
      type="button"
      class="p-4 border border-2 rounded-lg border-dashed bg-transparent flex flex-col h-40 w-full cursor-pointer transition-all items-center justify-center"
      :class="{
        'border-primary bg-primary/5': isDragging,
        'opacity-50 cursor-not-allowed': props.disabled || isMaxReached,
      }"
      :disabled="props.disabled || isMaxReached"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="fileInputRef?.click()"
    >
      <slot>
        <Icon name="i-icon-park-outline:upload" class="text-2xl text-card-foreground/50 mb-2" />
        <div class="text-sm text-card-foreground/70">
          {{ props.description }}
        </div>
      </slot>
      <input
        ref="fileInputRef"
        type="file"
        :multiple="props.directory || props.multiple"
        :webkitdirectory="props.directory || undefined"
        :directory="props.directory || undefined"
        :disabled="props.disabled"
        class="hidden"
        @change="e => onSelectFile((e.target as HTMLInputElement).files)"
      >
    </button>
    <div v-if="fileList.length > 0" class="gap-2 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      <div
        v-for="(item, index) in fileList"
        :key="item.name + index"
        class="group/file-upload-item py-2 pe-2 ps-3 border rounded-lg flex gap-2 items-center relative"
        :class="[
          item.status === 'error' ? 'border-red-500 bg-red-500/10' : '',
        ]"
        @click="emits('onClick', item, index)"
      >
        <div class="flex-1 truncate">
          <div class="text-sm font-medium truncate">
            {{ item.name }}
          </div>
          <div class="text-xs text-card-foreground/50">
            {{ filesize(item.size, { standard: 'jedec' }) }}
          </div>
        </div>
        <div v-if="item.status === 'uploading'" class="bg-primary/5 pointer-events-none inset-0 absolute z-0" :style="{ width: `${item.progress}%` }" />
        <div v-else-if="item.status === 'success'" class="flex-center size-10">
          <Icon name="i-ix:upload-success" class="text-lg text-green-600" />
        </div>
        <div v-else-if="item.status === 'error'" class="flex-center size-10">
          <Icon name="i-ix:upload-fail" class="text-lg text-red-600" />
        </div>
        <ButtonGroup v-if="!props.disabled" class="opacity-0 transition-opacity inset-e-2 top-1/2 absolute group-hover/file-upload-item:opacity-100 -translate-y-1/2">
          <Button v-if="item.status === 'error'" variant="outline" size="icon" @click.stop="uploadFile(item.file!, index)">
            <Icon name="i-icon-park-outline:upload" class="text-lg cursor-pointer" />
          </Button>
          <Button v-if="item.status !== 'uploading'" variant="outline" size="icon" @click.stop="removeFile(index)">
            <Icon name="i-icon-park-outline:delete" class="text-lg text-red-500 cursor-pointer" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  </div>
</template>
