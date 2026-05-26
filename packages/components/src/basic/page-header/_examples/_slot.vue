<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import FaPageHeader from '../index.vue'
</script>

<template>
  <FaPageHeader>
    <template #title>
      <div class="flex gap-2 items-center">
        <FaIcon name="i-lucide:user-round-cog" class="text-primary size-6" />
        用户管理
      </div>
    </template>
    <template #description>
      <p>提供 title、description 和右侧操作区域插槽。</p>
    </template>
    <FaButton variant="outline">
      <FaIcon name="i-lucide:plus" />
      新增用户
    </FaButton>
  </FaPageHeader>
</template>
