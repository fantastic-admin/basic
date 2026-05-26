<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaHoverCard from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaHoverCard align="start">
      <FaButton variant="link">
        Start
      </FaButton>
      <template #card>
        <div class="text-sm">
          起始位置对齐
        </div>
      </template>
    </FaHoverCard>
    <FaHoverCard align="center">
      <FaButton variant="link">
        Center
      </FaButton>
      <template #card>
        <div class="text-sm">
          居中对齐
        </div>
      </template>
    </FaHoverCard>
    <FaHoverCard align="end">
      <FaButton variant="link">
        End
      </FaButton>
      <template #card>
        <div class="text-sm">
          结束位置对齐
        </div>
      </template>
    </FaHoverCard>
  </div>
</template>
