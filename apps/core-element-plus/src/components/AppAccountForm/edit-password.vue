<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

defineOptions({
  name: 'EditPasswordForm',
})

const appAccountStore = useAppAccountStore()

const loading = ref(false)

interface EditPasswordModel {
  password: string
  newPassword: string
  checkPassword: string
}

const model = ref<EditPasswordModel>({
  password: '',
  newPassword: '',
  checkPassword: '',
})

const validationSchema = toTypedSchema(
  z.object({
    password: z.string().min(1, '请输入原密码'),
    newPassword: z.string().min(1, '请输入新密码').min(6, '密码长度为6到18位').max(18, '密码长度为6到18位'),
    checkPassword: z.string().min(1, '请确认新密码'),
  }).refine(data => data.newPassword === data.checkPassword, {
    message: '两次输入的密码不一致',
    path: ['checkPassword'],
  }),
)

function onSubmit(values: EditPasswordModel) {
  loading.value = true
  appAccountStore.editPassword(values).then(async () => {
    useFaToast().success('模拟修改成功，请重新登录')
    appAccountStore.logout()
  }).finally(() => {
    loading.value = false
  })
}
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
    <FaForm :model="model" :validation-schema="validationSchema" @submit="onSubmit">
      <FaFormItem name="password">
        <FaInput type="password" placeholder="原密码" class="w-full">
          <template #start>
            <FaIcon name="i-lucide:lock" />
          </template>
        </FaInput>
      </FaFormItem>
      <FaFormItem name="newPassword">
        <FaInput type="password" placeholder="新密码" class="w-full">
          <template #start>
            <FaIcon name="i-lucide:lock" />
          </template>
        </FaInput>
      </FaFormItem>
      <FaFormItem name="checkPassword">
        <FaInput type="password" placeholder="确认密码" class="w-full">
          <template #start>
            <FaIcon name="i-lucide:lock" />
          </template>
        </FaInput>
      </FaFormItem>
      <FaButton :loading="loading" size="lg" class="mt-8 w-full" type="submit">
        保存
      </FaButton>
    </FaForm>
  </div>
</template>
