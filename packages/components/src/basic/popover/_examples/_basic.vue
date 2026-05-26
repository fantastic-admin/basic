<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import FaPopover from '../index.vue'
</script>

<template>
  <FaPopover>
    <FaButton>
      浮动面板
      <FaIcon name="i-ep:caret-bottom" />
    </FaButton>
    <template #panel>
      <div class="flex h-30 w-60 items-center justify-center">
        面板内容
      </div>
    </template>
  </FaPopover>
</template>
