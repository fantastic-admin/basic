<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaTrend from '../index.vue'
</script>

<template>
  <div class="flex gap-2 items-center">
    <FaTrend value="12.3%" size="small" />
    <FaTrend value="12.3%" size="medium" />
    <FaTrend value="12.3%" size="large" />
  </div>
</template>
