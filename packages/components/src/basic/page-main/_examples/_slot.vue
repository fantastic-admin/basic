<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaPageMain from '../index.vue'
</script>

<template>
  <FaPageMain>
    <template #title>
      <div class="flex-center-between">
        通过 slot 设置标题
        <FaButton variant="outline" size="sm">
          还可以放置自定义按钮
        </FaButton>
      </div>
    </template>
    这里放页面内容。
  </FaPageMain>
</template>
