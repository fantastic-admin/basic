<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { reactive } from 'vue'
import FaInput from '../../input/index.vue'
import FaLabel from '../index.vue'

const form = reactive({
  name: '',
  email: '',
})
</script>

<template>
  <div class="space-y-4">
    <FaLabel label="用户名">
      <FaInput v-model="form.name" placeholder="请输入用户名" class="w-72" />
    </FaLabel>
    <FaLabel label="邮箱">
      <FaInput v-model="form.email" placeholder="请输入邮箱" class="w-72" />
    </FaLabel>
  </div>
</template>
