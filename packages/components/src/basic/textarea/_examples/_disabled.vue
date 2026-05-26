<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { shallowRef } from 'vue'
import FaTextarea from '../index.vue'

const value = shallowRef('这是一段不可编辑的文本内容。')
</script>

<template>
  <FaTextarea v-model="value" disabled class="w-96" />
</template>
