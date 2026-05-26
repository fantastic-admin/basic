<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import type { FileItem, FileUploadRequestOptions } from '../index.vue'
import { ref } from 'vue'
import { useToast } from '../../toast'
import FaFileUpload from '../index.vue'

const toast = useToast()
const files = ref<FileItem[]>([])

async function httpRequest({ file, onProgress }: FileUploadRequestOptions) {
  onProgress(30)
  await new Promise(resolve => setTimeout(resolve, 300))
  onProgress(100)

  return {
    url: URL.createObjectURL(file),
    name: file.name,
  }
}

function handleSuccess() {
  toast.success('自定义上传完成')
}
</script>

<template>
  <FaFileUpload
    v-model="files"
    :http-request="httpRequest"
    :after-upload="response => response.url"
    :max="3"
    @on-success="handleSuccess"
  />
</template>
