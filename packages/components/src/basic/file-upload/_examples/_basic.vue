<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import type { FileItem } from '../index.vue'
import { ref } from 'vue'
import { useToast } from '../../toast'
import FaFileUpload from '../index.vue'

const toast = useToast()
const files = ref<FileItem[]>([])

function handleSuccess() {
  toast.success('模拟上传成功')
}
</script>

<template>
  <FaFileUpload
    v-model="files"
    action="/fake/upload"
    :after-upload="response => response.data.url"
    multiple
    @on-success="handleSuccess"
  />
</template>
