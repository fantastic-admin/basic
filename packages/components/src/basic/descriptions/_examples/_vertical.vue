<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaDescriptions from '../index.vue'

const items = [
  { label: '早餐', value: '苹果' },
  { label: '早午餐', value: '苹果' },
  { label: '午餐', value: '苹果' },
  { label: '晚餐', value: '苹果' },
  { label: '正餐', value: '苹果' },
  { label: '夜宵', value: '苹果' },
  { label: '早餐', value: '苹果' },
  { label: '早午餐', value: '苹果', span: 2 },
  { label: '晚餐', value: '苹果', span: 3 },
]
</script>

<template>
  <FaDescriptions :items="items" :column="6" direction="vertical" border />
</template>
