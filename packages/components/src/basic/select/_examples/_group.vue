<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaSelect from '../index.vue'

const select = ref('1')

const options = [
  {
    label: 'Group 1',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
  },
  {
    label: 'Group 2',
    options: [
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
    ],
  },
]
</script>

<template>
  <FaSelect v-model="select" :options="options" />
</template>
