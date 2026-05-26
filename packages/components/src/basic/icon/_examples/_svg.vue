<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaIcon from '../index.vue'

const monoIcons = [
  'example-emotion-line',
  'example-emotion-laugh-line',
  'example-emotion-unhappy-line',
]

const colorIcons = [
  'example-crown',
  'example-star',
  'example-vip',
]
</script>

<template>
  <div class="space-y-4">
    <div>
      <div class="text-sm text-muted-foreground font-medium mb-3">
        单色
      </div>
      <div class="flex flex-wrap gap-4">
        <div v-for="name in monoIcons" :key="name" class="p-3 flex flex-col gap-1.5 w-24 items-center">
          <FaIcon :name="name" class="size-10" />
          <span class="text-xs text-muted-foreground text-center w-full truncate">{{ name.replace('example-', '') }}</span>
        </div>
      </div>
    </div>
    <div>
      <div class="text-sm text-muted-foreground font-medium mb-3">
        彩色
      </div>
      <div class="flex flex-wrap gap-4">
        <div v-for="name in colorIcons" :key="name" class="p-3 flex flex-col gap-1.5 w-24 items-center">
          <FaIcon :name="name" class="size-10" />
          <span class="text-xs text-muted-foreground text-center w-full truncate">{{ name.replace('example-', '') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
