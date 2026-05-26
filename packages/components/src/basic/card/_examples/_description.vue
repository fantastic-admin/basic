<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaCard from '../index.vue'
</script>

<template>
  <FaCard title="卡片标题" description="这是一段辅助描述，用于补充说明卡片内容。" class="w-80">
    卡片内容
  </FaCard>
</template>
