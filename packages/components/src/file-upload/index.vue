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

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef')
const isDragging = ref(false)

function formatText(template: string, params: Record<string, string | number>) {
  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value))
  }, template)
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  if (props.disabled) {
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
  if (props.disabled) {
    return
  }
  isDragging.value = false
  if (e.dataTransfer?.files) {
    onSelectFile(e.dataTransfer.files)
  }
}

function onSelectFile(files: FileList | File[] | null) {
  if (!files) {
    return
  }
  const selectedFiles = [...files]
  // 数量限制
  const remain = props.max > 0 ? props.max - fileList.value.length : selectedFiles.length
  const filesToAdd: File[] = []
  for (const file of selectedFiles.slice(0, remain)) {
    // 类型校验
    if (props.ext.length > 0) {
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (!props.ext.map(e => e.toLowerCase()).includes(ext || '')) {
        toast.error(formatText('上传文件只支持 {ext} 格式', { ext: props.ext.join(' / ') }))
        continue
      }
    }
    // 大小校验
    if (props.size > 0) {
      if (file.size > props.size) {
        toast.error(formatText('上传文件大小不能超过 {size}', { size: filesize(props.size, { standard: 'jedec' }) }))
        continue
      }
    }
    filesToAdd.push(file)
  }
  fileInputRef.value!.value = ''
  filesToAdd.forEach(file => uploadFile(file))
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
  <div class="space-y-2">
    <button
      type="button"
      class="p-4 border border-2 rounded-lg border-dashed bg-transparent flex flex-col h-40 w-full cursor-pointer transition-all items-center justify-center"
      :class="{
        'border-primary bg-primary/5': isDragging,
        'opacity-50 cursor-not-allowed': props.disabled || (props.max > 0 && fileList.length >= props.max),
      }"
      :disabled="props.disabled || (props.max > 0 && fileList.length >= props.max)"
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
        {{ formatText('支持 {ext} 格式', { ext: props.ext.join(' / ') }) }}
      </div>
      <div v-if="props.size > 0" class="after:content-[';_'] last:after:content-empty">
        {{ formatText('大小不超过 {size}', { size: filesize(props.size, { standard: 'jedec' }) }) }}
      </div>
      <div v-if="props.max > 0" class="after:content-[';_'] last:after:content-empty">
        {{ formatText('数量不超过 {max} 个', { max: props.max }) }}
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
