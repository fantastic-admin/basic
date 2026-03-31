<script setup lang="ts">
import type { FileItem } from '@fantastic-admin/components'

const files = ref<FileItem[]>([])

function handleSuccess() {
  faToast.success('模拟上传成功')
}
</script>

<template>
  <FaFileUpload
    v-model="files"
    action="/fake/upload"
    :after-upload="(response) => response.data.url"
    multiple
    @on-success="handleSuccess"
  >
    <div>可以在这里显示自定义内容</div>
  </FaFileUpload>
</template>
