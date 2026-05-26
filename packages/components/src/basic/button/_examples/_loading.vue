<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaButton loading>
      加载中
    </FaButton>
    <FaButton variant="outline" loading>
      保存中
    </FaButton>
    <FaButton variant="secondary" loading>
      提交中
    </FaButton>
  </div>
</template>
