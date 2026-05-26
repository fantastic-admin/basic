<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import type { UploadRequestOptions } from '../index.vue'
import { ref } from 'vue'
import { useToast } from '../../toast'
import FaImageUpload from '../index.vue'

const toast = useToast()
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
  toast.success('自定义上传完成')
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
