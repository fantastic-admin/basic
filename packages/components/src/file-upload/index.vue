<script setup lang="ts">
import axios from 'axios'
import { filesize } from 'filesize'
import { toast } from 'vue-sonner'

defineOptions({
  name: 'FaFileUpload',
})

const props = withDefaults(defineProps<{
  action: string
  method?: string
  headers?: Headers | Record<string, any>
  data?: Record<string, any>
  name?: string
  afterUpload?: (response: any) => string | Promise<string>
  multiple?: boolean
  ext?: string[]
  size?: number
  max?: number
  hideTips?: boolean
  disabled?: boolean
}>(), {
  method: 'post',
  headers: () => ({}),
  data: () => ({}),
  name: 'file',
  multiple: false,
  ext: () => [],
  size: 10 * 1024 * 1024,
  max: 0,
  hideTips: false,
  disabled: false,
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

const containerRef = useTemplateRef<HTMLElement>('containerRef')
const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef')
const isDragging = ref(false)
const isHoveringContainer = ref(false)
const isContainerFocused = ref(false)
const isMaxReached = computed(() => props.max > 0 && fileList.value.length >= props.max)
const canHandlePaste = computed(() =>
  !props.disabled
  && !isMaxReached.value
  && (isHoveringContainer.value || isContainerFocused.value),
)
const extAliasMap: Record<string, string[]> = {
  'jpeg': ['jpg', 'jpeg'],
  'jpg': ['jpg', 'jpeg'],
  'plain': ['txt'],
  'msword': ['doc'],
  'vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
  'vnd.ms-excel': ['xls'],
  'vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
  'vnd.ms-powerpoint': ['ppt'],
  'vnd.openxmlformats-officedocument.presentationml.presentation': ['pptx'],
  'x-zip-compressed': ['zip'],
  'zip': ['zip'],
  'x-rar-compressed': ['rar'],
  'vnd.rar': ['rar'],
  'rar': ['rar'],
  'x-7z-compressed': ['7z'],
}
const acceptedExts = computed(() => new Set(props.ext.flatMap(ext => normalizeExtVariants(ext))))

function normalizeExt(ext?: string) {
  if (!ext) {
    return ''
  }
  return ext.toLowerCase().trim().replace(/^\./, '').split('+')[0] ?? ''
}

function normalizeExtVariants(ext?: string) {
  const normalizedExt = normalizeExt(ext)
  if (!normalizedExt) {
    return []
  }
  return extAliasMap[normalizedExt] ?? [normalizedExt]
}

function getFileExtVariants(file: File) {
  const extVariants = new Set<string>()
  const fileNameExt = file.name.split('.').pop()
  normalizeExtVariants(fileNameExt).forEach(ext => extVariants.add(ext))
  const mimeExt = file.type.split('/')[1]
  normalizeExtVariants(mimeExt).forEach(ext => extVariants.add(ext))
  return extVariants
}

function validateFile(file: File) {
  if (acceptedExts.value.size > 0) {
    const fileExtVariants = getFileExtVariants(file)
    const isAccepted = [...fileExtVariants].some(ext => acceptedExts.value.has(ext))
    if (!isAccepted) {
      toast.error(`上传文件只支持 ${props.ext.join(' / ')} 格式`, {
        description: file.name || file.type,
      })
      return false
    }
  }
  if (props.size > 0 && file.size > props.size) {
    toast.error(`上传文件大小不能超过 ${filesize(props.size, { standard: 'jedec' })}`, {
      description: `${file.name || file.type} (${filesize(file.size, { standard: 'jedec' })})`,
    })
    return false
  }
  return true
}

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
  const selectedFiles = [...files]
  const remain = props.max > 0 ? props.max - fileList.value.length : selectedFiles.length
  if (remain <= 0) {
    return false
  }
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
  const filesToAdd = selectedFiles.slice(0, remain).filter(validateFile)
  if (filesToAdd.length === 0) {
    return false
  }
  filesToAdd.forEach(file => uploadFile(file))
  return true
}

function uploadFile(file: File, index?: number) {
  const formData = new FormData()
  Object.entries(props.data).forEach(([key, value]) => {
    formData.append(key, value)
  })
  formData.append(props.name, file)
  let headersObj: Record<string, any> = {}
  if (props.headers instanceof Headers) {
    props.headers.forEach((value, key) => {
      headersObj[key] = value
    })
  }
  else {
    headersObj = { ...props.headers }
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
  axios({
    url: props.action,
    method: props.method,
    headers: headersObj,
    data: formData,
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        fileList.value[currentFileIndex].progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      }
    },
  })
    .then(async (response) => {
      const url = await props.afterUpload?.(response.data)
      if (url) {
        fileList.value[currentFileIndex].url = url
      }
      emits('onSuccess', response.data, file)
      fileList.value[currentFileIndex].status = 'success'
    })
    .catch(() => {
      fileList.value[currentFileIndex].status = 'error'
    })
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
        <FaIcon name="i-icon-park-outline:upload" class="text-2xl text-card-foreground/50 mb-2" />
        <div class="text-sm text-card-foreground/70">
          拖放或点击上传
        </div>
      </slot>
      <input ref="fileInputRef" type="file" :multiple="props.multiple" :disabled="props.disabled" class="hidden" @change="e => onSelectFile((e.target as HTMLInputElement).files)">
    </button>
    <div v-if="!props.hideTips && !props.disabled" class="text-xs text-card-foreground/50 flex flex-wrap gap-1 empty:hidden">
      <div v-if="props.ext.length > 0" class="after:content-[';_'] last:after:content-empty">
        支持 {{ props.ext.join(' / ') }} 格式
      </div>
      <div class="after:content-[';_'] last:after:content-empty">
        支持粘贴上传
      </div>
      <div v-if="props.size > 0" class="after:content-[';_'] last:after:content-empty">
        大小不超过 {{ filesize(props.size, { standard: 'jedec' }) }}
      </div>
      <div v-if="props.max > 0" class="after:content-[';_'] last:after:content-empty">
        数量不超过 {{ props.max }} 个
      </div>
    </div>
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
          <FaIcon name="i-ix:upload-success" class="text-lg text-green-600" />
        </div>
        <div v-else-if="item.status === 'error'" class="flex-center size-10">
          <FaIcon name="i-ix:upload-fail" class="text-lg text-red-600" />
        </div>
        <FaButtonGroup v-if="!props.disabled" class="opacity-0 transition-opacity inset-e-2 top-1/2 absolute group-hover/file-upload-item:opacity-100 -translate-y-1/2">
          <FaButton v-if="item.status === 'error'" variant="outline" size="icon" @click.stop="uploadFile(item.file!, index)">
            <FaIcon name="i-icon-park-outline:upload" class="text-lg cursor-pointer" />
          </FaButton>
          <FaButton v-if="item.status !== 'uploading'" variant="outline" size="icon" @click.stop="removeFile(index)">
            <FaIcon name="i-icon-park-outline:delete" class="text-lg text-red-500 cursor-pointer" />
          </FaButton>
        </FaButtonGroup>
      </div>
    </div>
  </div>
</template>
