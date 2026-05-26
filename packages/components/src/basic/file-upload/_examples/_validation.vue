<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import type { FileItem } from '../index.vue'
import { ref } from 'vue'
import { useToast } from '../../toast'
import FaFileUpload from '../index.vue'

const toast = useToast()
const files = ref<FileItem[]>([
  { name: 'logo.svg', size: 1024 * 1024, url: 'https://fantastic-admin.hurui.me/logo.svg' },
])

function beforeUpload(file: File) {
  const isPng = file.type === 'image/png'
  const isLt200K = file.size <= 200 * 1024

  if (!isPng) {
    toast.error('只能上传 PNG 文件')
    return false
  }
  if (!isLt200K) {
    toast.error('文件大小不能超过 200KB')
    return false
  }
  return true
}

function handleSuccess() {
  toast.success('模拟上传成功')
}

function handleClick(fileItem: FileItem) {
  toast.info(fileItem.name, {
    description: fileItem.url,
  })
}
</script>

<template>
  <FaFileUpload
    v-model="files"
    action="/fake/upload"
    :after-upload="response => response.data.url"
    :before-upload="beforeUpload"
    multiple
    :max="5"
    @on-success="handleSuccess"
    @on-click="handleClick"
  />
</template>
