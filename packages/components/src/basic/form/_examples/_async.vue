<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import FaButton from '../../button/index.vue'
import FaInput from '../../input/index.vue'
import FaFormItem from '../FormItem.vue'
import FaForm from '../index.vue'

const submitted = shallowRef('')

const model = ref({
  username: '',
  email: '',
})

const unavailableNames = ['admin', 'root', 'fantastic']

const validationSchema = {
  async username(value: string) {
    if (!value) {
      return '请输入用户名'
    }

    if (value.length < 3) {
      return '用户名至少 3 个字符'
    }

    const available = await checkUsernameAvailable(value)
    return available ? true : '该用户名已被占用'
  },
  email(value: string) {
    return /^\S[^\s@]*@\S[^\s.]*\.\S+$/.test(value) ? true : '请输入有效邮箱'
  },
}

async function checkUsernameAvailable(value: string) {
  await wait(2000)
  return !unavailableNames.includes(value.trim().toLowerCase())
}

function wait(ms: number) {
  return new Promise(resolve => window.setTimeout(resolve, ms))
}

function handleSubmit(values: Record<string, unknown>) {
  submitted.value = JSON.stringify(values, null, 2)
}
</script>

<template>
  <div class="gap-4 grid max-w-160">
    <FaForm
      v-slot="{ isSubmitting }"
      :model="model"
      :validation-schema="validationSchema"
      @submit="handleSubmit"
    >
      <FaFormItem
        name="username"
        label="用户名"
        required
        description="输入 admin / root / fantastic 会返回占用错误"
      >
        <FaInput placeholder="请输入用户名" class="w-full" />
      </FaFormItem>
      <FaFormItem name="email" label="邮箱" required>
        <FaInput type="email" placeholder="name@example.com" class="w-full" />
      </FaFormItem>
      <FaButton type="submit" :loading="isSubmitting">
        提交
      </FaButton>
    </FaForm>
    <pre v-if="submitted" class="text-sm m-0 p-4 rounded-md bg-muted">{{ submitted }}</pre>
  </div>
</template>
