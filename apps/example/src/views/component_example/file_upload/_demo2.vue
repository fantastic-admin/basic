<script setup lang="ts">
import type { FileItem } from '@fantastic-admin/components'

const files = ref<FileItem[]>([
  { name: 'logo.svg', size: 1024 * 1024, url: 'https://fantastic-admin.hurui.me/logo.svg' },
])

function handleSuccess() {
  faToast.success('模拟上传成功')
}

function handleClick(fileItem: FileItem) {
  faToast.info(fileItem.name, {
    description: fileItem.url,
  })
}
</script>

<template>
  <FaFileUpload
    v-model="files"
    action="/fake/upload"
    :after-upload="(response) => response.data.url"
    multiple
    :ext="['png']"
    :size="200 * 1024"
    :max="5"
    @on-success="handleSuccess"
    @on-click="handleClick"
  />
</template>
