<script setup lang="ts">
import axios from 'axios'
import { filesize } from 'filesize'
import { toast } from 'vue-sonner'
import { useFaImagePreview } from '@/ui/components/FaImagePreview'
import { cn } from '@/utils'

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

const isUploading = ref(false)
const uploadProgress = ref(0)
const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef')

function onSelectFile(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files) {
    return
  }
  const selectedFiles = Array.from(input.files)
  const remain = props.max === 0 ? selectedFiles.length : props.max - images.value.length
  const filesToAdd: File[] = []
  for (const file of selectedFiles.slice(0, remain)) {
    const fileSize = file.size / 1024 / 1024
    if (fileSize > props.size) {
      toast.error(`上传图片大小不能超过 ${filesize(props.size, { standard: 'jedec' })}`)
      return
    }
    // 类型校验
    if (props.ext.length > 0) {
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (!props.ext.map(e => e.toLowerCase()).includes(ext || '')) {
        toast.error(`上传图片只支持 ${props.ext.join(' / ')} 格式`, {
          description: file.name,
        })
        continue
      }
    }
    // 大小校验
    if (props.size > 0) {
      if (file.size > props.size) {
        toast.error(`上传图片大小不能超过 ${filesize(props.size, { standard: 'jedec' })}`, {
          description: `${file.name} (${filesize(file.size, { standard: 'jedec' })})`,
        })
        continue
      }
    }
    filesToAdd.push(file)
  }
  fileInputRef.value!.value = ''
  // 上传每个文件
  filesToAdd.forEach((file) => {
    isUploading.value = true
    uploadProgress.value = 0
    const formData = new FormData()
    // 附加额外参数
    Object.entries(props.data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    formData.append(props.name, file)
    // 处理 headers，确保为普通对象
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
      isUploading.value = false
      uploadProgress.value = 0
    })
  })
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
  <div class="space-y-2">
    <div class="flex flex-wrap gap-2">
      <div
        v-for="(img, index) in images" :key="img" class="group/image-upload relative flex items-center justify-center overflow-hidden border rounded-lg" :style="{
          width: `${props.width}px`,
          height: `${props.height}px`,
        }"
      >
        <img :src="img" class="h-full w-full object-contain">
        <div v-if="!props.disabled" class="absolute inset-0 grid grid-cols-2 place-items-center rounded-lg bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover/image-upload:opacity-100">
          <div class="flex-center cursor-pointer opacity-60 transition-all hover:(scale-110 opacity-100)" @click.prevent="onPreview(index)">
            <FaIcon name="i-icon-park-outline:preview-open" class="size-6" />
          </div>
          <div class="flex-center cursor-pointer opacity-60 transition-all hover:(scale-110 opacity-100)" @click.prevent="onRemove(index)">
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
        v-if="images.length < props.max || props.max === 0" class="relative flex-center overflow-hidden bg-transparent" :class="{
          'cursor-not-allowed': props.disabled || isUploading,
        }" :style="{
          width: `${props.width}px`,
          height: `${props.height}px`,
        }" :disabled="props.disabled || isUploading" @click="fileInputRef?.click()"
      >
        <slot>
          <div class="size-full flex-center border border-2 rounded-lg border-dashed p-0 text-primary">
            <FaIcon name="i-icon-park-outline:upload" class="text-2xl text-card-foreground/50" />
          </div>
        </slot>
        <template v-if="isUploading && uploadProgress > 0 && uploadProgress < 100">
          <FaProgress :model-value="uploadProgress" class="absolute inset-x-1 inset-b-1 h-1 w-auto" />
        </template>
        <input ref="fileInputRef" type="file" accept="image/*" :multiple="props.multiple" class="hidden" @change="onSelectFile">
      </button>
    </div>
    <div v-if="!props.hideTips && !props.disabled" class="flex flex-wrap gap-1 text-xs text-card-foreground/50 empty:hidden">
      <div v-if="props.dimension" class="after:content-[';_'] last:after:content-empty">
        {{ `建议尺寸为 ${props.dimension?.width}*${props.dimension?.height}` }}
      </div>
      <div v-if="props.ext.length > 0" class="after:content-[';_'] last:after:content-empty">
        {{ `支持 ${props.ext.join(' / ')} 格式` }}
      </div>
      <div v-if="props.size > 0" class="after:content-[';_'] last:after:content-empty">
        {{ `大小不超过 ${filesize(props.size, { standard: 'jedec' })}` }}
      </div>
      <div v-if="props.max > 1" class="after:content-[';_'] last:after:content-empty">
        {{ `数量不超过 ${props.max} 个` }}
      </div>
    </div>
  </div>
</template>
