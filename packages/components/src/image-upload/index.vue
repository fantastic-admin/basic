<script setup lang="ts">
import axios from 'axios'
import { filesize } from 'filesize'
import { toast } from 'vue-sonner'
import { cn } from '../../utils'
import { useFaImagePreview } from '../image-preview'

defineOptions({
  name: 'FaImageUpload',
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
  max?: number
  width?: number
  height?: number
  dimension?: {
    width: number
    height: number
  }
  size?: number
  hideTips?: boolean
  disabled?: boolean
}>(), {
  method: 'post',
  headers: () => ({}),
  data: () => ({}),
  name: 'file',
  multiple: false,
  ext: () => [],
  max: 1,
  width: 100,
  height: 100,
  size: 5 * 1024 * 1024,
  hideTips: false,
  disabled: false,
})

const emits = defineEmits<{
  onSuccess: [response: any, file: File]
}>()

const images = defineModel<string[]>('modelValue', { required: true })

const activeUploadCount = ref(0)
const uploadProgress = ref(0)
const containerRef = useTemplateRef<HTMLElement>('containerRef')
const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef')
const isHoveringContainer = ref(false)
const isContainerFocused = ref(false)
const isUploading = computed(() => activeUploadCount.value > 0)
const acceptedExts = computed(() => new Set(props.ext.flatMap(ext => normalizeExtVariants(ext))))
const canHandlePaste = computed(() =>
  !props.disabled
  && !isUploading.value
  && (isHoveringContainer.value || isContainerFocused.value),
)

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
  if (normalizedExt === 'jpg' || normalizedExt === 'jpeg') {
    return ['jpg', 'jpeg']
  }
  return [normalizedExt]
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
      toast.error(`上传图片只支持 ${props.ext.join(' / ')} 格式`, {
        description: file.name || file.type,
      })
      return false
    }
  }
  if (props.size > 0 && file.size > props.size) {
    toast.error(`上传图片大小不能超过 ${filesize(props.size, { standard: 'jedec' })}`, {
      description: `${file.name || file.type} (${filesize(file.size, { standard: 'jedec' })})`,
    })
    return false
  }
  return true
}

function uploadFile(file: File) {
  activeUploadCount.value += 1
  uploadProgress.value = 0
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
  return axios({
    url: props.action,
    method: props.method,
    headers: headersObj,
    data: formData,
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      }
    },
  }).then(async (response) => {
    const url = await props.afterUpload?.(response.data)
    if (url) {
      images.value.push(url)
    }
    emits('onSuccess', response.data, file)
  }).finally(() => {
    activeUploadCount.value -= 1
    if (!isUploading.value) {
      uploadProgress.value = 0
    }
  })
}

function onSelectFile(e: Event) {
  handleFiles((e.target as HTMLInputElement).files)
}

function onPaste(e: ClipboardEvent) {
  if (e.defaultPrevented || !canHandlePaste.value) {
    return
  }
  const clipboardItems = [...(e.clipboardData?.items ?? [])]
  const filesFromItems = clipboardItems
    .filter(item => item.kind === 'file' && item.type.startsWith('image/'))
    .map(item => item.getAsFile())
    .filter((file): file is File => file !== null)
  const files = filesFromItems.length > 0
    ? filesFromItems
    : [...(e.clipboardData?.files ?? [])].filter(file => file.type.startsWith('image/'))

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

function handleFiles(files: FileList | File[] | null) {
  if (!files || props.disabled || isUploading.value) {
    return false
  }
  const selectedFiles = [...files]
  const remain = props.max === 0 ? selectedFiles.length : props.max - images.value.length
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
  filesToAdd.forEach((file) => {
    void uploadFile(file)
  })
  return true
}

function onRemove(idx: number) {
  images.value.splice(idx, 1)
}

function onPreview(index: number) {
  useFaImagePreview().open(images.value, index)
}

function onMove(index: number, direction: 'forward' | 'backward') {
  if (direction === 'forward' && index !== 0) {
    images.value[index] = images.value.splice(index - 1, 1, images.value[index])[0]
  }
  if (direction === 'backward' && index !== images.value.length - 1) {
    images.value[index] = images.value.splice(index + 1, 1, images.value[index])[0]
  }
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
    <div class="flex flex-wrap gap-2">
      <div
        v-for="(img, index) in images" :key="img" class="group/image-upload border rounded-lg flex items-center justify-center relative overflow-hidden" :style="{
          width: `${props.width}px`,
          height: `${props.height}px`,
        }"
      >
        <img :src="img" class="h-full w-full object-contain">
        <div v-if="!props.disabled" class="text-white p-2 rounded-lg bg-black/50 opacity-0 grid grid-cols-2 transition-opacity inset-0 place-items-center absolute group-hover/image-upload:opacity-100">
          <div class="opacity-60 flex-center cursor-pointer transition-all hover:(opacity-100 scale-110)" @click.prevent="onPreview(index)">
            <FaIcon name="i-icon-park-outline:preview-open" class="size-6" />
          </div>
          <div class="opacity-60 flex-center cursor-pointer transition-all hover:(opacity-100 scale-110)" @click.prevent="onRemove(index)">
            <FaIcon name="i-icon-park-outline:delete" class="size-6" />
          </div>
          <div
            v-show="images.length > 1" :class="cn('flex-center cursor-pointer opacity-60 transition-all', {
              'hover:(scale-110 opacity-100)': index !== 0,
              'cursor-not-allowed': index === 0,
            })" @click="onMove(index, 'forward')"
          >
            <FaIcon name="i-icon-park-outline:arrow-circle-left" class="size-6" />
          </div>
          <div
            v-show="images.length > 1" :class="cn('flex-center cursor-pointer opacity-60 transition-all', {
              'hover:(scale-110 opacity-100)': index !== images.length - 1,
              'cursor-not-allowed': index === images.length - 1,
            })" @click="onMove(index, 'backward')"
          >
            <FaIcon name="i-icon-park-outline:arrow-circle-right" class="size-6" />
          </div>
        </div>
      </div>
      <button
        v-if="images.length < props.max || props.max === 0"
        type="button"
        class="bg-transparent flex-center relative overflow-hidden"
        :class="{
          'cursor-not-allowed': props.disabled || isUploading,
        }"
        :style="{
          width: `${props.width}px`,
          height: `${props.height}px`,
        }"
        :disabled="props.disabled || isUploading"
        @click="fileInputRef?.click()"
      >
        <slot>
          <div class="text-primary p-0 border border-2 rounded-lg border-dashed flex-center size-full">
            <FaIcon name="i-icon-park-outline:upload" class="text-2xl text-card-foreground/50" />
          </div>
        </slot>
        <template v-if="isUploading && uploadProgress > 0 && uploadProgress < 100">
          <FaProgress :model-value="uploadProgress" class="h-1 w-auto inset-x-1 inset-b-1 absolute" />
        </template>
        <input ref="fileInputRef" type="file" accept="image/*" :multiple="props.multiple" class="hidden" @change="onSelectFile">
      </button>
    </div>
    <div v-if="!props.hideTips" class="text-xs text-card-foreground/50 flex flex-wrap gap-1 empty:hidden">
      <div v-if="props.dimension" class="after:content-[';_'] last:after:content-empty">
        建议尺寸为 {{ props.dimension.width }}*{{ props.dimension.height }}
      </div>
      <div v-if="props.ext.length > 0" class="after:content-[';_'] last:after:content-empty">
        支持 {{ props.ext.join(' / ') }} 格式
      </div>
      <div v-if="!props.disabled" class="after:content-[';_'] last:after:content-empty">
        支持粘贴上传
      </div>
      <div v-if="props.size > 0" class="after:content-[';_'] last:after:content-empty">
        大小不超过 {{ filesize(props.size, { standard: 'jedec' }) }}
      </div>
      <div v-if="props.max > 1" class="after:content-[';_'] last:after:content-empty">
        数量不超过 {{ props.max }} 个
      </div>
    </div>
  </div>
</template>
