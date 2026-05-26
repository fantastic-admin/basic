<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaImagePreview from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4 items-end">
    <FaImagePreview src="https://fantastic-admin.hurui.me/logo.svg" class="size-25" />
    <FaImagePreview src="https://fantastic-admin.hurui.me/logo.svg" class="size-40" />
    <FaImagePreview src="https://fantastic-admin.hurui.me/logo.svg" class="h-40 w-60" />
  </div>
</template>
