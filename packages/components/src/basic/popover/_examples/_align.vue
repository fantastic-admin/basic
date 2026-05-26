<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaPopover from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaPopover align="start">
      <FaButton variant="outline">
        Start
      </FaButton>
      <template #panel>
        <div class="text-sm">
          起始位置对齐
        </div>
      </template>
    </FaPopover>
    <FaPopover align="center">
      <FaButton variant="outline">
        Center
      </FaButton>
      <template #panel>
        <div class="text-sm">
          居中对齐
        </div>
      </template>
    </FaPopover>
    <FaPopover align="end">
      <FaButton variant="outline">
        End
      </FaButton>
      <template #panel>
        <div class="text-sm">
          结束位置对齐
        </div>
      </template>
    </FaPopover>
  </div>
</template>
