<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaIcon from '../index.vue'

const icons = [
  'i-lucide:search',
  'i-lucide:settings',
  'i-ep:edit',
  'i-ri:notification-3-line',
  'i-tabler:chart-area-line',
]
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div v-for="name in icons" :key="name" class="p-3 flex flex-col gap-2 w-32 items-center">
      <FaIcon :name="name" class="text-primary size-9" />
      <span class="text-xs text-muted-foreground text-center w-full truncate">{{ name }}</span>
    </div>
  </div>
</template>
