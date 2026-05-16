<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted, onUnmounted, ref, shallowRef, useTemplateRef, watch } from 'vue'
import { cn } from '#utils'
import Icon from '../icon/index.vue'
import { useImagePreview } from '../image-preview'
import Progress from '../progress/index.vue'

export interface UploadRequestOptions {
  action: string
  method: string
  headers: Headers | Record<string, any>
  data: Record<string, any>
  name: string
  file: File
  onProgress: (percent: number) => void
}

defineOptions({
  name: 'BuiltInImageUpload',
})

const props = withDefaults(defineProps<{
  action?: string
  method?: string
  headers?: Headers | Record<string, any>
  data?: Record<string, any>
  name?: string
  afterUpload?: (response: any) => string | Promise<string>
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  httpRequest?: (options: UploadRequestOptions) => any | Promise<any>
  multiple?: boolean
  max?: number
  width?: number
  height?: number
  directory?: boolean
  disabled?: boolean
}>(), {
  action: '',
  method: 'post',
  headers: () => ({}),
  data: () => ({}),
  name: 'file',
  multiple: false,
  max: 1,
  width: 100,
  height: 100,
  directory: false,
  disabled: false,
})

const emits = defineEmits<{
  onSuccess: [response: any, file: File]
}>()

const images = defineModel<string[]>('modelValue', { required: true })

interface ImageItem {
  key: string
  src: string
}

const activeUploadCount = ref(0)
const uploadProgress = ref(0)
const imageItemSeed = shallowRef(0)
const imageItems = ref<ImageItem[]>([])
const containerRef = useTemplateRef<HTMLElement>('containerRef')
const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef')
const isHoveringContainer = ref(false)
const isContainerFocused = ref(false)
const isUploading = computed(() => activeUploadCount.value > 0)
const canHandlePaste = computed(() =>
  !props.disabled
  && !isUploading.value
  && !props.directory
  && (isHoveringContainer.value || isContainerFocused.value),
)

watch(images, (currentImages) => {
  const reusableItems = new Map<string, ImageItem[]>()
  imageItems.value.forEach((item) => {
    const itemsForSrc = reusableItems.get(item.src)
    if (itemsForSrc) {
      itemsForSrc.push(item)
    }
    else {
      reusableItems.set(item.src, [item])
    }
  })

  imageItems.value = currentImages.map((src) => {
    const reusableItem = reusableItems.get(src)?.shift()
    if (reusableItem) {
      return reusableItem
    }

    imageItemSeed.value += 1
    return {
      key: `fa-image-upload-item-${imageItemSeed.value}`,
      src,
    }
  })
}, {
  deep: true,
  immediate: true,
})

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

async function defaultHttpRequest(options: UploadRequestOptions) {
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

async function uploadFile(file: File) {
  const canUpload = await props.beforeUpload?.(file)
  if (canUpload === false) {
    return
  }

  activeUploadCount.value += 1
  uploadProgress.value = 0
  try {
    const response = await (props.httpRequest ?? defaultHttpRequest)({
      action: props.action,
      method: props.method,
      headers: props.headers,
      data: props.data,
      name: props.name,
      file,
      onProgress: (percent) => {
        uploadProgress.value = percent
      },
    })
    const url = await props.afterUpload?.(response)
    if (url) {
      images.value.push(url)
    }
    emits('onSuccess', response, file)
  }
  finally {
    activeUploadCount.value -= 1
    if (!isUploading.value) {
      uploadProgress.value = 0
    }
  }
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
  const selectedFiles = [...files].filter(file => file instanceof File)
  const remain = props.max === 0 ? selectedFiles.length : props.max - images.value.length
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

function onRemove(idx: number) {
  images.value.splice(idx, 1)
}

function onPreview(index: number) {
  useImagePreview().open(images.value, index)
}

function onMove(index: number, direction: 'forward' | 'backward') {
  if (direction === 'forward' && index !== 0) {
    images.value[index] = images.value.splice(index - 1, 1, images.value[index])[0]
  }
  if (direction === 'backward' && index !== images.value.length - 1) {
    images.value[index] = images.value.splice(index + 1, 1, images.value[index])[0]
  }
}

function onBeforeLeave(el: Element) {
  if (!(el instanceof HTMLElement) || !(el.parentElement instanceof HTMLElement)) {
    return
  }

  const elementRect = el.getBoundingClientRect()
  const listRect = el.parentElement.getBoundingClientRect()

  el.style.left = `${elementRect.left - listRect.left}px`
  el.style.top = `${elementRect.top - listRect.top}px`
  el.style.width = `${elementRect.width}px`
  el.style.height = `${elementRect.height}px`
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
    <TransitionGroup
      tag="div"
      name="fa-image-upload-list"
      class="fa-image-upload-list flex flex-wrap gap-2"
      @before-leave="onBeforeLeave"
    >
      <div
        v-for="(item, index) in imageItems" :key="item.key" class="fa-image-upload-item group/image-upload border rounded-lg flex items-center justify-center relative overflow-hidden" :style="{
          width: `${props.width}px`,
          height: `${props.height}px`,
        }"
      >
        <img :src="item.src" class="h-full w-full object-contain">
        <div v-if="!props.disabled" class="text-white p-2 rounded-lg bg-black/50 opacity-0 grid grid-cols-2 transition-opacity inset-0 place-items-center absolute group-hover/image-upload:opacity-100">
          <div class="opacity-60 flex-center cursor-pointer transition-all hover:(opacity-100 scale-110)" @click.prevent="onPreview(index)">
            <Icon name="i-icon-park-outline:preview-open" class="size-6" />
          </div>
          <div class="opacity-60 flex-center cursor-pointer transition-all hover:(opacity-100 scale-110)" @click.prevent="onRemove(index)">
            <Icon name="i-icon-park-outline:delete" class="size-6" />
          </div>
          <div
            v-show="images.length > 1" :class="cn('flex-center cursor-pointer opacity-60 transition-all', {
              'hover:(scale-110 opacity-100)': index !== 0,
              'cursor-not-allowed': index === 0,
            })" @click="onMove(index, 'forward')"
          >
            <Icon name="i-icon-park-outline:arrow-circle-left" class="size-6" />
          </div>
          <div
            v-show="images.length > 1" :class="cn('flex-center cursor-pointer opacity-60 transition-all', {
              'hover:(scale-110 opacity-100)': index !== images.length - 1,
              'cursor-not-allowed': index === images.length - 1,
            })" @click="onMove(index, 'backward')"
          >
            <Icon name="i-icon-park-outline:arrow-circle-right" class="size-6" />
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
            <Icon name="i-icon-park-outline:upload" class="text-2xl text-card-foreground/50" />
          </div>
        </slot>
        <template v-if="isUploading && uploadProgress > 0 && uploadProgress < 100">
          <Progress :model-value="uploadProgress" class="h-1 w-auto inset-x-1 inset-b-1 absolute" />
        </template>
        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          :multiple="props.directory || props.multiple"
          :webkitdirectory="props.directory || undefined"
          :directory="props.directory || undefined"
          class="hidden"
          @change="onSelectFile"
        >
      </button>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.fa-image-upload-list {
  --fa-image-upload-ease: cubic-bezier(0.22, 1, 0.36, 1);

  position: relative;
}

.fa-image-upload-item {
  transform-origin: center;
}

.fa-image-upload-list-enter-active,
.fa-image-upload-list-leave-active {
  transition:
    opacity 180ms var(--fa-image-upload-ease),
    transform 240ms var(--fa-image-upload-ease);
}

.fa-image-upload-list-move {
  transition: transform 240ms var(--fa-image-upload-ease);
  will-change: transform;
}

.fa-image-upload-list-enter-from,
.fa-image-upload-list-leave-to {
  opacity: 0;
  transform: scale(0.94);
}

.fa-image-upload-list-leave-active {
  position: absolute;
  z-index: 2;
  pointer-events: none;
}
</style>
