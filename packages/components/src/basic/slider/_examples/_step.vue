<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaSlider from '../index.vue'

const value = ref<number[]>([50])
</script>

<template>
  <FaSlider v-model="value" :step="10" />
</template>
