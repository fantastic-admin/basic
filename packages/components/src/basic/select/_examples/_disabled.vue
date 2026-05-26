<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaSelect from '../index.vue'

const disabledSelect = ref('1')
const optionDisabledSelect = ref('1')

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2', disabled: true },
  { label: 'Option 3', value: '3' },
]
</script>

<template>
  <div class="space-y-2">
    <FaSelect v-model="disabledSelect" :options="options" disabled />
    <FaSelect v-model="optionDisabledSelect" :options="options" />
  </div>
</template>
