<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaButton disabled>
      禁用按钮
    </FaButton>
    <FaButton variant="outline" disabled>
      禁用边框按钮
    </FaButton>
    <FaButton variant="secondary" disabled>
      禁用次要按钮
    </FaButton>
  </div>
</template>
