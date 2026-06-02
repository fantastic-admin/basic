<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaTag from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaTag icon="i-lucide:check">
      成功
    </FaTag>
    <FaTag icon="i-lucide:alert-triangle" variant="destructive">
      警告
    </FaTag>
    <FaTag icon="i-lucide:info" variant="outline">
      信息
    </FaTag>
    <FaTag icon="i-lucide:star" variant="secondary">
      收藏
    </FaTag>
  </div>
</template>
