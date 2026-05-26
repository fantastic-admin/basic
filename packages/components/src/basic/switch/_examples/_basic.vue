<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaSwitch from '../index.vue'

const checked = ref(false)
</script>

<template>
  <FaSwitch v-model="checked" />
</template>
