<script setup lang="ts">
import type { FileItem } from '@fantastic-admin/components'

const files = ref<FileItem[]>([
  { name: 'logo.svg', size: 1024 * 1024, url: 'https://fantastic-admin.hurui.me/logo.svg' },
])

function beforeUpload(file: File) {
  const isPng = file.type === 'image/png'
  const isLt200K = file.size <= 200 * 1024

  if (!isPng) {
    useFaToast().error('只能上传 PNG 文件')
    return false
  }
  if (!isLt200K) {
    useFaToast().error('文件大小不能超过 200KB')
    return false
  }
  return true
}

function handleSuccess() {
  useFaToast().success('模拟上传成功')
}

function handleClick(fileItem: FileItem) {
  useFaToast().info(fileItem.name, {
    description: fileItem.url,
  })
}
</script>

<template>
  <FaFileUpload
    v-model="files"
    action="/fake/upload"
    :after-upload="(response) => response.data.url"
    :before-upload="beforeUpload"
    multiple
    :max="5"
    @on-success="handleSuccess"
    @on-click="handleClick"
  />
</template>
