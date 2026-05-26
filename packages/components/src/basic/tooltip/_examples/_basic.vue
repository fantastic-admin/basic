<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaIcon from '../../icon/index.vue'
import FaTooltip from '../index.vue'
</script>

<template>
  <FaTooltip text="注意噢！">
    <FaIcon name="i-ri:question-line" class="text-lg cursor-help" />
  </FaTooltip>
</template>
