<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import { useToast } from '../index'

const toast = useToast()

function showLoading() {
  const loading = toast.loading('正在处理...', {
    duration: Infinity,
  })

  setTimeout(() => {
    toast.dismiss(loading)
    toast.success('处理完成')
  }, 2000)
}

function showPromise() {
  toast.promise(() => new Promise((resolve) => {
    setTimeout(resolve, 2000)
  }), {
    loading: '正在加载数据',
    success: () => '数据加载完成',
    error: () => '数据加载失败',
  })
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaButton @click="showLoading">
      加载状态
    </FaButton>
    <FaButton @click="showPromise">
      Promise 状态
    </FaButton>
  </div>
</template>
