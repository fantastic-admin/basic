<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaTooltip from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaTooltip text="起始对齐" align="start">
      <FaButton variant="ghost">
        Start
      </FaButton>
    </FaTooltip>
    <FaTooltip text="居中对齐" align="center">
      <FaButton variant="ghost">
        Center
      </FaButton>
    </FaTooltip>
    <FaTooltip text="末端对齐" align="end">
      <FaButton variant="ghost">
        End
      </FaButton>
    </FaTooltip>
  </div>
</template>
