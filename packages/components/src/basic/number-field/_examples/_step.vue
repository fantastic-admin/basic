<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaNumberField from '../index.vue'

const value = ref(0)
</script>

<template>
  <FaNumberField v-model="value" :step="0.1" />
</template>
