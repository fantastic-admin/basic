<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaDivider from '../index.vue'
</script>

<template>
  <div>
    <FaDivider>
      center
    </FaDivider>
    <FaDivider position="start">
      start
    </FaDivider>
    <FaDivider position="end">
      end
    </FaDivider>
  </div>
</template>
