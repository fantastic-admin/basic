<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import type { UploadRequestOptions } from '../index.vue'
import { ref } from 'vue'
import FaImageUpload from '../index.vue'

const files = ref<string[]>([])

function beforeUpload(file: File) {
  return file.type.startsWith('image/')
}

async function httpRequest({ file, onProgress }: UploadRequestOptions) {
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
  <FaImageUpload
    v-model="files"
    directory
    :max="0"
    :http-request="httpRequest"
    :before-upload="beforeUpload"
    :after-upload="response => response.url"
  />
</template>
