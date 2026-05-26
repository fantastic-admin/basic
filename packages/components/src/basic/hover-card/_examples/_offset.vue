<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaHoverCard from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaHoverCard :side-offset="12">
      <FaButton variant="link">
        Side offset
      </FaButton>
      <template #card>
        <div class="text-sm">
          与触发元素保持更大距离
        </div>
      </template>
    </FaHoverCard>
    <FaHoverCard align="start" :align-offset="24">
      <FaButton variant="link">
        Align offset
      </FaButton>
      <template #card>
        <div class="text-sm">
          沿对齐方向偏移
        </div>
      </template>
    </FaHoverCard>
    <FaHoverCard :side-offset="12" :align-offset="-24">
      <FaButton variant="link">
        Both
      </FaButton>
      <template #card>
        <div class="text-sm">
          同时设置两种偏移
        </div>
      </template>
    </FaHoverCard>
  </div>
</template>
