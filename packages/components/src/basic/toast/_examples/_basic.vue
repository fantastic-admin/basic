<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import { useToast } from '../index'

const toast = useToast()

function showDefault() {
  toast('Fantastic-admin 杰出的管理系统框架', {
    description: '开箱即用，提供舒适开发体验',
  })
}

function showSuccess() {
  toast.success('保存成功', {
    description: '内容已同步到服务器',
  })
}

function showError() {
  toast.error('保存失败', {
    description: '请检查网络后重试',
  })
}

function showInfo() {
  toast.info('系统通知', {
    description: '今晚 22:00 将进行例行维护',
  })
}

function showWarning() {
  toast.warning('注意事项', {
    description: '离开页面前请确认内容已保存',
  })
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaButton @click="showDefault">
      默认
    </FaButton>
    <FaButton @click="showSuccess">
      成功
    </FaButton>
    <FaButton @click="showError">
      错误
    </FaButton>
    <FaButton @click="showInfo">
      信息
    </FaButton>
    <FaButton @click="showWarning">
      警告
    </FaButton>
  </div>
</template>
