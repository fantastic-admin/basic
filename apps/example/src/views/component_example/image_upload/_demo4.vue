<script setup lang="ts">
import type { UploadRequestOptions } from '@fantastic-admin/components'

const files = ref<string[]>([])

async function httpRequest({ file, onProgress }: UploadRequestOptions) {
  onProgress(30)
  await new Promise(resolve => setTimeout(resolve, 300))
  onProgress(100)

  return {
    url: URL.createObjectURL(file),
    name: file.name,
  }
}

function handleSuccess() {
  faToast.success('自定义上传完成')
}
</script>

<template>
  <FaImageUpload
    v-model="files"
    :http-request="httpRequest"
    :after-upload="response => response.url"
    :max="3"
    @on-success="handleSuccess"
  />
</template>
