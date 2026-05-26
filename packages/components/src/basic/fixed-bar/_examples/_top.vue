<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaSlider from '../../slider/index.vue'
import FaFixedBar from '../index.vue'

const height = ref([50])
</script>

<template>
  <FaFixedBar position="top">
    <FaSlider v-model="height" />
    <div :style="`height: ${height[0]}px;`" />
  </FaFixedBar>
</template>
