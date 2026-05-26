<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaInput from '../../input/index.vue'
import FaPasswordStrength from '../index.vue'

const password = ref('')

const rules = [
  { label: '长度至少为 10 个字符', rule: (value: string) => value.length >= 10 },
  { label: '包含大写字母', rule: (value: string) => /[A-Z]/.test(value) },
  { label: '包含数字', rule: (value: string) => /\d/.test(value) },
  { label: '包含特殊字符', rule: (value: string) => /[^A-Z0-9]/i.test(value) },
]

const colorThresholds = [
  { min: 0, color: 'bg-red-500' },
  { min: 2, color: 'bg-yellow-500' },
  { min: 4, color: 'bg-green-500' },
]
</script>

<template>
  <div class="flex-col w-80">
    <FaInput v-model="password" placeholder="请输入密码" class="w-full" />
    <FaPasswordStrength
      :password="password"
      :rules="rules"
      :color-thresholds="colorThresholds"
      class="mt-2"
    />
  </div>
</template>
