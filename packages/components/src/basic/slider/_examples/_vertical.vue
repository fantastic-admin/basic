<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaSlider from '../index.vue'

const value = ref<number[]>([30])
</script>

<template>
  <FaSlider v-model="value" orientation="vertical" class="data-[orientation=vertical]:h-100" />
</template>
