<script setup lang="ts">
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/shadcn/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
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

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    account: z.string().min(1, '请输入用户名'),
    captcha: z.string().min(6, '请输入验证码'),
    newPassword: z.string().min(1, '请输入新密码').min(6, '密码长度为6到18位').max(18, '密码长度为6到18位'),
  })),
  initialValues: {
    account: props.account ?? '',
    captcha: '',
    newPassword: '',
  },
})
const onSubmit = form.handleSubmit((values) => {
  loading.value = true
  emits('onResetPassword', values.account)
})

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
  <div class="min-h-500px w-full flex-col-stretch-center p-12">
    <form @submit="onSubmit">
      <div class="mb-8 space-y-2">
        <h3 class="text-4xl color-[var(--el-text-color-primary)] font-bold">
          忘记密码了? 🔒
        </h3>
        <p class="text-sm text-muted-foreground lg:text-base">
          演示系统未提供该功能
        </p>
      </div>
      <FormField v-slot="{ componentField, errors }" name="account">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <FaInput type="text" placeholder="请输入用户名" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
          </FormControl>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <div class="flex-start-between gap-2">
        <FormField v-slot="{ componentField, value, setValue }" name="captcha">
          <FormItem class="relative pb-6 space-y-0">
            <FormControl>
              <FaPinInput :model-value="value" :name="componentField.name" :length="6" class="border-destructive" @update:model-value="val => setValue(val)" />
            </FormControl>
            <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
              <FormMessage class="absolute bottom-1 text-xs" />
            </Transition>
          </FormItem>
        </FormField>
        <FaButton variant="outline" size="lg" :disabled="countdown > 0" class="flex-1 px-4" @click="handleSendCaptcha">
          {{ countdown === 0 ? '发送验证码' : `${countdown} 秒后可重新发送` }}
        </FaButton>
      </div>
      <FormField v-slot="{ componentField, errors }" name="newPassword">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <FaInput type="password" placeholder="请输入新密码" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
          </FormControl>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <FaButton :loading="loading" size="lg" class="mt-4 w-full" type="submit">
        确认
      </FaButton>
      <div class="mt-4 flex-center gap-2 text-sm color-[var(--el-text-color-secondary)]">
        <FaButton variant="link" class="h-auto p-0" @click="emits('onLogin', form.values.account)">
          去登录
        </FaButton>
      </div>
    </form>
  </div>
</template>
