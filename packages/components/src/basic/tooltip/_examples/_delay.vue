<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaTooltip from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaTooltip text="100ms 后显示" :delay="100">
      <FaButton variant="ghost">
        快速显示
      </FaButton>
    </FaTooltip>
    <FaTooltip text="1000ms 后显示" :delay="1000">
      <FaButton variant="ghost">
        延迟显示
      </FaButton>
    </FaTooltip>
  </div>
</template>
