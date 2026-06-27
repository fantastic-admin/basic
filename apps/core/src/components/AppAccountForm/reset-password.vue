<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

defineOptions({
  name: 'ResetPasswordForm',
})

const props = defineProps<{
  account?: string
}>()

const emits = defineEmits<{
  onLogin: [account?: string]
  onResetPassword: [account?: string]
}>()

const loading = ref(false)

interface ResetPasswordModel {
  account: string
  captcha: string
  newPassword: string
}

const model = ref<ResetPasswordModel>({
  account: props.account ?? '',
  captcha: '',
  newPassword: '',
})

const validationSchema = toTypedSchema(z.object({
  account: z.string().min(1, '请输入用户名'),
  captcha: z.string().min(6, '请输入验证码'),
  newPassword: z.string().min(1, '请输入新密码').min(6, '密码长度为6到18位').max(18, '密码长度为6到18位'),
}))

function onSubmit(values: ResetPasswordModel) {
  loading.value = true
  emits('onResetPassword', values.account)
}

const countdown = ref(0)
const countdownInterval = ref(Number.NaN)
function handleSendCaptcha() {
  countdown.value = 60
  countdownInterval.value = window.setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(countdownInterval.value)
    }
  }, 1000)
}
</script>

<template>
  <div class="p-12 flex-col-stretch-center min-h-500px w-full">
    <FaForm :model="model" :validation-schema="validationSchema" @submit="onSubmit">
      <div class="mb-8 space-y-2">
        <h3 class="text-4xl font-bold">
          忘记密码了? 🔒
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
      <FaFormItem name="captcha" :auto-bind="false">
        <div class="flex-start-between gap-2">
          <FaInputOTP
            v-model="model.captcha"
            name="captcha"
            :length="6"
            class="border-destructive"
          />
          <FaButton variant="outline" type="button" :disabled="countdown > 0" class="px-4 flex-1" @click="handleSendCaptcha">
            {{ countdown === 0 ? '发送验证码' : `${countdown} 秒后重发` }}
          </FaButton>
        </div>
      </FaFormItem>
      <FaFormItem name="newPassword">
        <FaInput type="password" placeholder="新密码" class="w-full">
          <template #start>
            <FaIcon name="i-lucide:lock" />
          </template>
        </FaInput>
      </FaFormItem>
      <FaButton :loading="loading" size="lg" class="mt-4 w-full" type="submit">
        确认
      </FaButton>
      <div class="text-sm mt-4 flex-center gap-2">
        <FaButton variant="link" class="p-0 h-auto" type="button" @click="emits('onLogin', model.account)">
          去登录
        </FaButton>
      </div>
    </FaForm>
  </div>
</template>
