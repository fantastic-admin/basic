<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaInput from '../index.vue'

const value = ref('')
</script>

<template>
  <FaInput v-model="value" placeholder="请输入密码" type="password" />
</template>
