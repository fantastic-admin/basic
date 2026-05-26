<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaKbd from '../index.vue'
</script>

<template>
  <div class="flex flex-col gap-2">
    <FaKbd>Ctrl</FaKbd>
    <FaKbd>Alt</FaKbd>
    <FaKbd>Shift</FaKbd>
  </div>
</template>
