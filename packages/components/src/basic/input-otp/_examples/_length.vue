<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaInputOTP from '../index.vue'

const input = ref('')
</script>

<template>
  <FaInputOTP v-model="input" :length="4" />
</template>
