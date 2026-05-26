<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import type { FileItem, FileUploadRequestOptions } from '../index.vue'
import { ref } from 'vue'
import FaFileUpload from '../index.vue'

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
