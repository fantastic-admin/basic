<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaPopover from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaPopover side="top">
      <FaButton variant="outline">
        Top
      </FaButton>
      <template #panel>
        <div class="text-sm">
          从上方弹出
        </div>
      </template>
    </FaPopover>
    <FaPopover side="right">
      <FaButton variant="outline">
        Right
      </FaButton>
      <template #panel>
        <div class="text-sm">
          从右侧弹出
        </div>
      </template>
    </FaPopover>
    <FaPopover side="bottom">
      <FaButton variant="outline">
        Bottom
      </FaButton>
      <template #panel>
        <div class="text-sm">
          从下方弹出
        </div>
      </template>
    </FaPopover>
    <FaPopover side="left">
      <FaButton variant="outline">
        Left
      </FaButton>
      <template #panel>
        <div class="text-sm">
          从左侧弹出
        </div>
      </template>
    </FaPopover>
  </div>
</template>
