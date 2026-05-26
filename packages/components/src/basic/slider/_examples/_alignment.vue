<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaSlider from '../index.vue'

const containValue = ref<number[]>([30])
const overflowValue = ref<number[]>([30])
</script>

<template>
  <div class="space-y-6">
    <FaSlider v-model="containValue" thumb-alignment="contain" />
    <FaSlider v-model="overflowValue" thumb-alignment="overflow" />
  </div>
</template>
