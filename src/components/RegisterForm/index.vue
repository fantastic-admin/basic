<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'RegisterForm',
})

const props = defineProps<{
  account?: string
}>()

const emits = defineEmits<{
  onLogin: [account: string]
  onRegister: [account: string]
}>()

const loading = ref(false)

const formRef = useTemplateRef<FormInstance>('formRef')
const form = ref({
  account: props.account ?? '',
  captcha: '',
  password: '',
  checkPassword: '',
})
const rules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  captcha: [
    { required: true, trigger: 'blur', message: () => '请输入验证码' },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  checkPassword: [
    { required: true, trigger: 'blur', message: '请再次输入密码' },
    {
      validator: (_rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('两次输入的密码不一致'))
        }
        else {
          callback()
        }
      },
    },
  ],
})
function handleRegister() {
  ElMessage({
    message: '注册模块仅提供界面演示，无实际功能，需开发者自行扩展',
    type: 'warning',
  })
  formRef.value?.validate((valid) => {
    if (valid) {
      // 这里编写业务代码
      emits('onRegister', form.value.account)
    }
  })
}
</script>

<template>
  <ElForm ref="formRef" :model="form" :rules="rules" class="min-h-500px w-full flex-col-stretch-center p-12">
    <h3 class="mb-8 text-xl color-[var(--el-text-color-primary)] font-bold">
      探索从这里开始! 🚀
    </h3>
    <div>
      <ElFormItem prop="account">
        <ElInput v-model="form.account" size="large" placeholder="用户名" tabindex="1">
          <template #prefix>
            <SvgIcon name="i-ri:user-3-fill" />
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="captcha">
        <ElInput v-model="form.captcha" size="large" placeholder="验证码" tabindex="2">
          <template #prefix>
            <SvgIcon name="i-ic:baseline-verified-user" />
          </template>
          <template #append>
            <ElButton>发送验证码</ElButton>
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput v-model="form.password" type="password" size="large" placeholder="密码" tabindex="3" show-password>
          <template #prefix>
            <SvgIcon name="i-ri:lock-2-fill" />
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="checkPassword">
        <ElInput v-model="form.checkPassword" type="password" size="large" placeholder="确认密码" tabindex="4" show-password>
          <template #prefix>
            <SvgIcon name="i-ri:lock-2-fill" />
          </template>
        </ElInput>
      </ElFormItem>
    </div>
    <ElButton :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleRegister">
      注册
    </ElButton>
    <div class="mt-4 flex-center gap-2 text-sm color-[var(--el-text-color-secondary)]">
      已经有帐号?
      <ElLink type="primary" :underline="false" @click="emits('onLogin', form.account)">
        去登录
      </ElLink>
    </div>
  </ElForm>
</template>
