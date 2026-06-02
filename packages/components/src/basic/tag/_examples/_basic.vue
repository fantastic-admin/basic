<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaTag from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaTag>
      默认标签
    </FaTag>
    <FaTag variant="destructive">
      危险标签
    </FaTag>
    <FaTag variant="outline">
      边框标签
    </FaTag>
    <FaTag variant="secondary">
      次要标签
    </FaTag>
  </div>
</template>
