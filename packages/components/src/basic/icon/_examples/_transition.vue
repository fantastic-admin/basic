<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { shallowRef } from 'vue'
import FaButton from '../../button/index.vue'
import FaIcon from '../index.vue'

const active = shallowRef(false)
</script>

<template>
  <div class="flex flex-wrap gap-6 items-end">
    <div class="px-6 py-4 border rounded-lg flex flex-col gap-3 items-center">
      <span class="text-xs text-muted-foreground font-medium">无动画</span>
      <FaIcon :name="active ? 'i-lucide:heart' : 'i-lucide:star'" class="size-8" />
    </div>
    <div class="px-6 py-4 border rounded-lg flex flex-col gap-3 items-center">
      <span class="text-xs text-muted-foreground font-medium">过渡动画</span>
      <FaIcon :name="active ? 'i-lucide:heart' : 'i-lucide:star'" class="text-primary size-8" transition />
    </div>
    <FaButton @click="active = !active">
      切换图标
    </FaButton>
  </div>
</template>
