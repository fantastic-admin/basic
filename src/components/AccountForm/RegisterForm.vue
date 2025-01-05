<script setup lang="ts">
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/shadcn/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
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

const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      account: z.string().min(1, '请输入用户名'),
      captcha: z.string().min(6, '请输入验证码'),
      password: z.string().min(1, '请输入密码').min(6, '密码长度为6到18位').max(18, '密码长度为6到18位'),
      checkPassword: z.string().min(1, '请再次输入密码'),
    }).refine(data => data.password === data.checkPassword, {
      message: '两次输入的密码不一致',
      path: ['checkPassword'],
    }),
  ),
  initialValues: {
    account: props.account ?? '',
    captcha: '',
    password: '',
    checkPassword: '',
  },
})
const onSubmit = form.handleSubmit((values) => {
  loading.value = true
  emits('onRegister', values.account)
})
</script>

<template>
  <div class="min-h-500px w-full flex-col-stretch-center p-12">
    <form @submit="onSubmit">
      <div class="mb-8 space-y-2">
        <h3 class="text-4xl color-[var(--el-text-color-primary)] font-bold">
          探索从这里开始 🚀
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
      <FormField v-slot="{ componentField, value, errors }" name="password">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <FaInput type="password" placeholder="请输入密码" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            <FaPasswordStrength :password="value" class="mt-2" />
          </FormDescription>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, errors }" name="checkPassword">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <FaInput type="password" placeholder="请再次输入密码" class="w-full" :class="errors.length && 'border-destructive'" v-bind="componentField" />
          </FormControl>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <FaButton :loading="loading" size="lg" class="mt-4 w-full" type="submit">
        注册
      </FaButton>
      <div class="mt-4 flex-center gap-2 text-sm">
        <span class="text-secondary-foreground op-50">已经有帐号?</span>
        <FaButton variant="link" class="h-auto p-0" @click="emits('onLogin', form.values.account)">
          去登录
        </FaButton>
      </div>
    </form>
  </div>
</template>
