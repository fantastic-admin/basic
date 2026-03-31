<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/shadcn/ui/form'

defineOptions({
  name: 'EditPasswordForm',
})

const appAccountStore = useAppAccountStore()

const loading = ref(false)

const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      password: z.string().min(1, '请输入原密码'),
      newPassword: z.string().min(1, '请输入新密码').min(6, '密码长度为6到18位').max(18, '密码长度为6到18位'),
      checkPassword: z.string().min(1, '请确认新密码'),
    }).refine(data => data.newPassword === data.checkPassword, {
      message: '两次输入的密码不一致',
      path: ['checkPassword'],
    }),
  ),
  initialValues: {
    password: '',
    newPassword: '',
    checkPassword: '',
  },
})
const onSubmit = form.handleSubmit((values) => {
  loading.value = true
  appAccountStore.editPassword(values).then(async () => {
    faToast.success('模拟修改成功，请重新登录')
    appAccountStore.logout()
  }).finally(() => {
    loading.value = false
  })
})
</script>

<template>
  <div class="flex-col-stretch-center w-full">
    <div class="mb-6 space-y-2">
      <h3 class="text-4xl font-bold">
        修改密码
      </h3>
      <p class="text-sm text-muted-foreground lg:text-base">
        请输入原密码、新密码和确认密码
      </p>
    </div>
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField, errors }" name="password">
        <FormItem class="pb-6 relative space-y-0">
          <FormControl>
            <FaInput type="password" placeholder="原密码" class="w-full" :class="{ 'border-destructive': errors.length }" v-bind="componentField">
              <template #start>
                <FaIcon name="i-lucide:lock" />
              </template>
            </FaInput>
          </FormControl>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="text-xs bottom-1 absolute" />
          </Transition>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, errors }" name="newPassword">
        <FormItem class="pb-6 relative space-y-0">
          <FormControl>
            <FaInput type="password" placeholder="新密码" class="w-full" :class="{ 'border-destructive': errors.length }" v-bind="componentField">
              <template #start>
                <FaIcon name="i-lucide:lock" />
              </template>
            </FaInput>
          </FormControl>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="text-xs bottom-1 absolute" />
          </Transition>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, errors }" name="checkPassword">
        <FormItem class="pb-6 relative space-y-0">
          <FormControl>
            <FaInput type="password" placeholder="确认密码" class="w-full" :class="{ 'border-destructive': errors.length }" v-bind="componentField">
              <template #start>
                <FaIcon name="i-lucide:lock" />
              </template>
            </FaInput>
          </FormControl>
          <Transition enter-active-class="transition-opacity" enter-from-class="opacity-0" leave-active-class="transition-opacity" leave-to-class="opacity-0">
            <FormMessage class="text-xs bottom-1 absolute" />
          </Transition>
        </FormItem>
      </FormField>
      <FaButton :loading="loading" size="lg" class="mt-8 w-full" type="submit">
        保存
      </FaButton>
    </form>
  </div>
</template>
