<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaIcon from '../../icon/index.vue'
import FaButton from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4 items-center">
    <FaButton size="sm">
      小按钮
    </FaButton>
    <FaButton>
      默认尺寸
    </FaButton>
    <FaButton size="lg">
      大按钮
    </FaButton>
    <FaButton size="icon-sm" variant="outline">
      <FaIcon name="i-lucide:search" />
    </FaButton>
    <FaButton size="icon" variant="outline">
      <FaIcon name="i-lucide:settings" />
    </FaButton>
    <FaButton size="icon-lg" variant="outline">
      <FaIcon name="i-lucide:plus" />
    </FaButton>
  </div>
</template>
