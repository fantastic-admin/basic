<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaCollapsible from '../index.vue'
</script>

<template>
  <FaCollapsible>
    <template #trigger="{ open }">
      <FaButton>
        {{ open ? '收起' : '展开' }}
      </FaButton>
    </template>
    <div class="mt-4 space-y-2">
      <div v-for="item in 5" :key="item" class="px-4 py-2 border rounded-md">
        内容 {{ item }}
      </div>
    </div>
  </FaCollapsible>
</template>
