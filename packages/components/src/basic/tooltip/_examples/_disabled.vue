<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaTooltip from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaTooltip text="正常显示提示">
      <FaButton variant="ghost">
        启用
      </FaButton>
    </FaTooltip>
    <FaTooltip text="该提示已禁用" disabled>
      <FaButton variant="ghost">
        禁用
      </FaButton>
    </FaTooltip>
  </div>
</template>
