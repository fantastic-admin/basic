<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

defineOptions({
  name: 'RegisterForm',
})

const props = defineProps<{
  account?: string
}>()

const emits = defineEmits<{
  onLogin: [account?: string]
  onRegister: [account?: string]
}>()

const loading = ref(false)

interface RegisterModel {
  account: string
  password: string
  checkPassword: string
}

const model = ref<RegisterModel>({
  account: props.account ?? '',
  password: '',
  checkPassword: '',
})

const validationSchema = toTypedSchema(
  z.object({
    account: z.string().min(1, '请输入用户名'),
    password: z.string().min(1, '请输入密码').min(6, '密码长度为6到18位').max(18, '密码长度为6到18位'),
    checkPassword: z.string().min(1, '请再次输入密码'),
  }).refine(data => data.password === data.checkPassword, {
    message: '两次输入的密码不一致',
    path: ['checkPassword'],
  }),
)

function onSubmit(values: RegisterModel) {
  loading.value = true
  emits('onRegister', values.account)
}
</script>

<template>
  <div class="p-12 flex-col-stretch-center min-h-500px w-full">
    <FaForm :model="model" :validation-schema="validationSchema" @submit="onSubmit">
      <div class="mb-8 space-y-2">
        <h3 class="text-4xl font-bold">
          探索从这里开始 🚀
        </h3>
        <p class="text-sm text-muted-foreground lg:text-base">
          演示系统未提供该功能
        </p>
      </div>
      <FaFormItem name="account">
        <FaInput type="text" placeholder="用户名" class="w-full">
          <template #start>
            <FaIcon name="i-lucide:user" />
          </template>
        </FaInput>
      </FaFormItem>
      <FaFormItem name="password">
        <FaInput type="password" placeholder="密码" class="w-full">
          <template #start>
            <FaIcon name="i-lucide:lock" />
          </template>
        </FaInput>
        <FaPasswordStrength :password="model.password" />
      </FaFormItem>
      <FaFormItem name="checkPassword">
        <FaInput type="password" placeholder="确认密码" class="w-full">
          <template #start>
            <FaIcon name="i-lucide:lock" />
          </template>
        </FaInput>
      </FaFormItem>
      <FaButton :loading="loading" size="lg" class="mt-4 w-full" type="submit">
        注册
      </FaButton>
      <div class="text-sm mt-4 flex-center gap-2">
        <span class="text-secondary-foreground op-50">已经有帐号?</span>
        <FaButton variant="link" class="p-0 h-auto" type="button" @click="emits('onLogin', model.account)">
          去登录
        </FaButton>
      </div>
    </FaForm>
  </div>
</template>
