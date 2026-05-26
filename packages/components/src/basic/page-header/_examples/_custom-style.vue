<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaPageHeader from '../index.vue'
</script>

<template>
  <FaPageHeader
    title="自定义样式"
    description="通过 class、main-class 和 default-class 调整布局和外观。"
    class="border rounded-lg bg-muted/40"
    main-class="flex-[1_1_60%]"
    default-class="flex gap-2"
  >
    <FaButton variant="outline">
      取消
    </FaButton>
    <FaButton>
      保存
    </FaButton>
  </FaPageHeader>
</template>
