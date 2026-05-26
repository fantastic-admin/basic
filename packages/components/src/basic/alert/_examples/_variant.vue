<script lang="ts" setup>
// 组件实际使用时无需手动导入，框架会自动导入
import FaAlert from '../index.vue'
</script>

<template>
  <FaAlert
    icon="i-lucide:circle-alert"
    title="危险提示"
    description="删除后数据将无法恢复，请谨慎操作。"
    variant="destructive"
  />
</template>
