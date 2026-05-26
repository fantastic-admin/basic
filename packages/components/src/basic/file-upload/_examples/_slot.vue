<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import type { FileItem } from '../index.vue'
import { ref } from 'vue'
import FaIcon from '../../icon/index.vue'
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
  >
    <FaIcon name="i-lucide:folder-up" class="text-3xl text-primary mb-2" />
    <div class="text-sm font-medium">
      上传项目附件
    </div>
    <div class="text-xs text-muted-foreground mt-1">
      支持拖拽、点击选择或粘贴文件
    </div>
  </FaFileUpload>
</template>
