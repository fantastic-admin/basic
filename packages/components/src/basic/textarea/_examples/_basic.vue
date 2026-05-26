<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { shallowRef } from 'vue'
import FaTextarea from '../index.vue'

const value = shallowRef('')
</script>

<template>
  <FaTextarea v-model="value" placeholder="请输入内容" class="w-96" />
</template>
