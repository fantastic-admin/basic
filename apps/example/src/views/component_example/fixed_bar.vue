<script setup lang="ts">
import { fixedBar } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="固定栏">
      <template #description>
        <div class="space-y-2">
          <p>FaFixedBar</p>
          <p>固定在页面顶部或底部，可用于展示页面信息、操作按钮等</p>
        </div>
      </template>
    </FaPageHeader>
    <FaPageMain
      v-for="example in fixedBar"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
    <div class="m-4 pt-20 border rounded-lg bg-background flex h-vh justify-center">
      尝试滚动页面，查看固定效果
    </div>
  </div>
</template>
