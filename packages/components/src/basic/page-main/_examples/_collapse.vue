<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaPageMain from '../index.vue'
</script>

<template>
  <FaPageMain title="带展开/收起功能" collaspe height="100px">
    <div class="space-y-4">
      <h3 class="text-2xl font-bold">
        Fantastic-admin
      </h3>
      <p class="text-sm text-muted-foreground">
        设置 collaspe 后，内容区域会在指定高度折叠。
      </p>
      <p>鼠标移入内容底部，可以看到展开和收起按钮。</p>
      <p>这是一段用于撑开内容高度的文本。</p>
      <p>继续补充一些内容，让折叠效果更明显。</p>
    </div>
  </FaPageMain>
</template>
