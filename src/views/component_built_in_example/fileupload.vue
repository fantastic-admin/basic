<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import type { FileItem } from '@/ui/components/FaFileUpload/index.vue'
import { toast } from 'vue-sonner'

const files1 = ref<FileItem[]>([])
const files2 = ref<FileItem[]>([
  { name: 'logo.svg', size: 1024 * 1024, url: 'https://fantastic-admin.hurui.me/logo.svg' },
])

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
  <div>
    <FaPageHeader title="文件上传" description="FaFileUpload" />
    <FaPageMain>
      <FaFileUpload
        v-model="files1"
        action="/mock/upload"
        :after-upload="(response) => response.data.url"
        multiple
        @on-success="handleSuccess"
      />
    </FaPageMain>
    <FaPageMain title="限制上传数量、大小、类型、点击事件">
      <FaFileUpload
        v-model="files2"
        action="/mock/upload"
        :after-upload="(response) => response.data.url"
        multiple
        :ext="['png']"
        :size="200 * 1024"
        :max="5"
        @on-success="handleSuccess"
        @on-click="handleClick"
      />
    </FaPageMain>
  </div>
</template>
