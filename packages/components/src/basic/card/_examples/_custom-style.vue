<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaCard from '../index.vue'
</script>

<template>
  <FaCard
    title="自定义样式"
    description="通过 class、headerClass、contentClass 和 footerClass 调整区域样式。"
    class="py-0 gap-0 w-96 overflow-hidden"
    header-class="bg-primary/8 py-4"
    content-class="py-6 text-sm leading-6"
    footer-class="bg-muted text-sm text-muted-foreground py-3"
  >
    这里是自定义内容区域，可以根据业务场景调整间距、背景和边框。
    <template #footer>
      自定义页脚区域
    </template>
  </FaCard>
</template>
