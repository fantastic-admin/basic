<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import { useToast } from '../../toast'
import FaImageUpload from '../index.vue'

const toast = useToast()
const files = ref<string[]>(['https://fantastic-admin.hurui.me/logo.svg'])

function handleSuccess() {
  toast.success('模拟上传成功')
}
</script>

<template>
  <FaImageUpload
    v-model="files"
    action="/fake/upload"
    :after-upload="response => `${response.data.url}?fake=${Math.random()}`"
    :max="2"
    @on-success="handleSuccess"
  />
</template>
