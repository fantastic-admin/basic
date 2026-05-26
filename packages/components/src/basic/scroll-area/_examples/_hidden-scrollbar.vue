<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaScrollArea from '../index.vue'
</script>

<template>
  <FaScrollArea :scrollbar="false" class="border rounded-md h-72 w-48">
    <div v-for="item in 20" :key="item" class="text-sm p-4">
      {{ item }}
    </div>
  </FaScrollArea>
</template>
