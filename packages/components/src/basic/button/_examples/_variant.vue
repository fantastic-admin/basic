<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaButton>
      默认按钮
    </FaButton>
    <FaButton variant="destructive">
      危险按钮
    </FaButton>
    <FaButton variant="outline">
      边框按钮
    </FaButton>
    <FaButton variant="secondary">
      次要按钮
    </FaButton>
    <FaButton variant="ghost">
      幽灵按钮
    </FaButton>
    <FaButton variant="link">
      链接按钮
    </FaButton>
  </div>
</template>
