<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'ResetPasswordForm',
})

const props = defineProps<{
  account?: string
}>()

const emits = defineEmits<{
  onLogin: [account: string]
  onResetPassword: [account: string]
}>()

const loading = ref(false)

const formRef = useTemplateRef<FormInstance>('formRef')
const form = ref({
  account: props.account ?? localStorage.login_account ?? '',
  captcha: '',
  newPassword: '',
})
const rules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  captcha: [
    { required: true, trigger: 'blur', message: '请输入验证码' },
  ],
  newPassword: [
    { required: true, trigger: 'blur', message: '请输入新密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
})
function handleReset() {
  ElMessage({
    message: '重置密码仅提供界面演示，无实际功能，需开发者自行扩展',
    type: 'info',
  })
  formRef.value?.validate((valid) => {
    if (valid) {
      // 这里编写业务代码
      emits('onResetPassword', form.value.account)
    }
  })
}
</script>

<template>
  <ElForm ref="formRef" :model="form" :rules="rules" class="min-h-500px w-full flex-col-stretch-center p-12">
    <h3 class="mb-8 text-xl color-[var(--el-text-color-primary)] font-bold">
      忘记密码了? 🔒
    </h3>
    <div>
      <ElFormItem prop="account">
        <ElInput v-model="form.account" size="large" placeholder="用户名" type="text" tabindex="1">
          <template #prefix>
            <SvgIcon name="i-ri:user-3-fill" />
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="captcha">
        <ElInput v-model="form.captcha" size="large" placeholder="验证码" type="text" tabindex="2">
          <template #prefix>
            <SvgIcon name="i-ic:baseline-verified-user" />
          </template>
          <template #append>
            <ElButton>发送验证码</ElButton>
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="newPassword">
        <ElInput v-model="form.newPassword" type="password" size="large" placeholder="新密码" tabindex="3" show-password>
          <template #prefix>
            <SvgIcon name="i-ri:lock-2-fill" />
          </template>
        </ElInput>
      </ElFormItem>
    </div>
    <ElButton :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleReset">
      确认
    </ElButton>
    <div class="mt-4 flex-center gap-2 text-sm color-[var(--el-text-color-secondary)]">
      <ElLink type="primary" :underline="false" @click="emits('onLogin', form.account)">
        去登录
      </ElLink>
    </div>
  </ElForm>
</template>
