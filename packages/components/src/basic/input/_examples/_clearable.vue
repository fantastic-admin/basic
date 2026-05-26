<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaInput from '../index.vue'

const value = ref('可清空的内容')
</script>

<template>
  <FaInput v-model="value" clearable placeholder="请输入内容" />
</template>
