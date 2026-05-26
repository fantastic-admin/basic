<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { reactive } from 'vue'
import FaInput from '../../input/index.vue'
import FaSelect from '../../select/index.vue'
import FaLabel from '../index.vue'

const form = reactive({
  name: '',
  role: 'admin',
  phone: '',
})

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '访客', value: 'guest' },
]
</script>

<template>
  <div class="space-y-4">
    <FaLabel label="用户名" :label-width="88">
      <FaInput v-model="form.name" placeholder="请输入用户名" class="w-72" />
    </FaLabel>
    <FaLabel label="角色" :label-width="88">
      <FaSelect v-model="form.role" :options="roleOptions" class="w-72" />
    </FaLabel>
    <FaLabel label="手机号" :label-width="88">
      <FaInput v-model="form.phone" placeholder="请输入手机号" class="w-72" />
    </FaLabel>
  </div>
</template>
