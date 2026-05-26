<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaSlider from '../index.vue'

const withTooltipValue = ref<number[]>([30])
const withoutTooltipValue = ref<number[]>([70])
</script>

<template>
  <div class="space-y-6">
    <FaSlider v-model="withTooltipValue" />
    <FaSlider v-model="withoutTooltipValue" :tooltip="false" />
  </div>
</template>
