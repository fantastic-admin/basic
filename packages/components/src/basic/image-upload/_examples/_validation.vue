<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaIcon from '../../icon/index.vue'
import { useToast } from '../../toast'
import FaImageUpload from '../index.vue'

const toast = useToast()
const files = ref<string[]>([])

function beforeUpload(file: File) {
  if (!file.type.startsWith('image/')) {
    toast.error('请选择图片文件')
    return false
  }
  if (file.size > 200 * 1024) {
    toast.error('图片大小不能超过 200KB')
    return false
  }
  return true
}

function handleSuccess() {
  toast.success('模拟上传成功')
}
</script>

<template>
  <FaImageUpload
    v-model="files"
    action="/fake/upload"
    :after-upload="response => `${response.data.url}?fake=${Math.random()}`"
    :before-upload="beforeUpload"
    :width="200"
    :height="130"
    :max="0"
    @on-success="handleSuccess"
  >
    <FaIcon name="i-noto:identification-card" class="opacity-50 size-50" />
  </FaImageUpload>
</template>
