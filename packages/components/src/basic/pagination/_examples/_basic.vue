<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaPagination from '../index.vue'

const page = ref(1)
const size = ref(10)
const total = ref(100)
</script>

<template>
  <FaPagination v-model:page="page" v-model:size="size" :total="total" />
</template>
