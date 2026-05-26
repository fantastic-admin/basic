<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaSwitch from '../index.vue'

const off = ref(false)
const on = ref(true)
</script>

<template>
  <div class="flex gap-4">
    <FaSwitch v-model="off" disabled />
    <FaSwitch v-model="on" disabled />
  </div>
</template>
