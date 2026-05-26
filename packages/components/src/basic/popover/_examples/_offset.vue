<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaPopover from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaPopover :side-offset="12">
      <FaButton variant="outline">
        Side offset
      </FaButton>
      <template #panel>
        <div class="text-sm">
          与触发元素保持更大距离
        </div>
      </template>
    </FaPopover>
    <FaPopover align="start" :align-offset="24">
      <FaButton variant="outline">
        Align offset
      </FaButton>
      <template #panel>
        <div class="text-sm">
          沿对齐方向偏移
        </div>
      </template>
    </FaPopover>
    <FaPopover :side-offset="12" :align-offset="-24">
      <FaButton variant="outline">
        Both
      </FaButton>
      <template #panel>
        <div class="text-sm">
          同时设置两种偏移
        </div>
      </template>
    </FaPopover>
  </div>
</template>
