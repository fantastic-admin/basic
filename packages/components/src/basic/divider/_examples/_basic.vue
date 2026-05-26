<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaDivider from '../index.vue'
</script>

<template>
  <div>
    <div class="text-sm text-muted-foreground">
      上方内容
    </div>
    <FaDivider />
    <div class="text-sm text-muted-foreground">
      下方内容
    </div>
    <FaDivider>
      分割文字
    </FaDivider>
  </div>
</template>
