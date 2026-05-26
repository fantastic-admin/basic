<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaHoverCard from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaHoverCard side="top">
      <FaButton variant="link">
        Top
      </FaButton>
      <template #card>
        <div class="text-sm">
          从上方弹出
        </div>
      </template>
    </FaHoverCard>
    <FaHoverCard side="right">
      <FaButton variant="link">
        Right
      </FaButton>
      <template #card>
        <div class="text-sm">
          从右侧弹出
        </div>
      </template>
    </FaHoverCard>
    <FaHoverCard side="bottom">
      <FaButton variant="link">
        Bottom
      </FaButton>
      <template #card>
        <div class="text-sm">
          从下方弹出
        </div>
      </template>
    </FaHoverCard>
    <FaHoverCard side="left">
      <FaButton variant="link">
        Left
      </FaButton>
      <template #card>
        <div class="text-sm">
          从左侧弹出
        </div>
      </template>
    </FaHoverCard>
  </div>
</template>
