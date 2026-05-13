<script setup lang="ts">
import type { FileItem, FileUploadRequestOptions } from '@fantastic-admin/components'

const files = ref<FileItem[]>([])

async function httpRequest({ file, onProgress }: FileUploadRequestOptions) {
  onProgress(50)
  await new Promise(resolve => setTimeout(resolve, 200))
  onProgress(100)

  return {
    url: URL.createObjectURL(file),
    name: file.name,
  }
}
</script>

<template>
  <FaFileUpload
    v-model="files"
    directory
    :max="0"
    :http-request="httpRequest"
    :after-upload="response => response.url"
  />
</template>
