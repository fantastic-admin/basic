<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaTooltip from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaTooltip text="上方提示" side="top">
      <FaButton variant="ghost">
        上方
      </FaButton>
    </FaTooltip>
    <FaTooltip text="右侧提示" side="right">
      <FaButton variant="ghost">
        右侧
      </FaButton>
    </FaTooltip>
    <FaTooltip text="下方提示" side="bottom">
      <FaButton variant="ghost">
        下方
      </FaButton>
    </FaTooltip>
    <FaTooltip text="左侧提示" side="left">
      <FaButton variant="ghost">
        左侧
      </FaButton>
    </FaTooltip>
  </div>
</template>
