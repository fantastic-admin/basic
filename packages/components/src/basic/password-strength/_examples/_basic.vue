<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaInput from '../../input/index.vue'
import FaPasswordStrength from '../index.vue'

const password = ref('')
</script>

<template>
  <div class="flex-col w-80">
    <FaInput v-model="password" placeholder="请输入密码" class="w-full" />
    <FaPasswordStrength :password="password" class="mt-2" />
  </div>
</template>
