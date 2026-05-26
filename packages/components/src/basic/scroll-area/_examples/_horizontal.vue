<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaScrollArea from '../index.vue'
</script>

<template>
  <FaScrollArea horizontal class="overscroll-contain border rounded-md w-96">
    <div class="flex-center-start">
      <div v-for="item in 20" :key="item" class="text-sm flex-center shrink-0 h-16 w-16">
        {{ item }}
      </div>
    </div>
  </FaScrollArea>
</template>
