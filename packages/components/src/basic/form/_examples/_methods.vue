<script setup lang="ts">
import type { FormExpose } from '../index'
import { ref, shallowRef, useTemplateRef } from 'vue'
import FaButton from '../../button/index.vue'
import FaInput from '../../input/index.vue'
import FaFormItem from '../FormItem.vue'
import FaForm from '../index.vue'

const formRef = useTemplateRef<FormExpose>('formRef')
const message = shallowRef('')

const model = ref({
  email: '',
  nickname: '',
})

const validationSchema = {
  email(value: string) {
    return /^\S[^\s@]*@\S[^\s.]*\.\S+$/.test(value) ? true : '请输入有效邮箱'
  },
  nickname(value: string) {
    return value.length >= 2 ? true : '昵称至少 2 个字符'
  },
}

async function submit() {
  await formRef.value?.submit()
}

function handleSubmit() {
  message.value = '提交成功'
}

async function validate() {
  const result = await formRef.value?.validate()
  message.value = result?.valid ? '校验通过' : '校验未通过'
}

function fillDemo() {
  formRef.value?.setFieldValue('email', 'admin@example.com')
  formRef.value?.setFieldValue('nickname', 'Fantastic')
}

function resetFields() {
  formRef.value?.resetFields()
  message.value = ''
}
</script>

<template>
  <div class="gap-4 grid max-w-160">
    <FaForm
      ref="formRef"
      :model="model"
      :validation-schema="validationSchema"
      scroll-to-error
      @submit="handleSubmit"
    >
      <FaFormItem name="email" label="邮箱" required>
        <FaInput type="email" class="w-full" />
      </FaFormItem>
      <FaFormItem name="nickname" label="昵称" required>
        <FaInput class="w-full" />
      </FaFormItem>
      <div class="flex flex-wrap gap-2">
        <FaButton type="button" @click="submit">
          提交
        </FaButton>
        <FaButton type="button" @click="validate">
          校验
        </FaButton>
        <FaButton type="button" variant="outline" @click="fillDemo">
          填充
        </FaButton>
        <FaButton type="button" variant="outline" @click="resetFields">
          重置
        </FaButton>
      </div>
    </FaForm>
    <div v-if="message" class="text-sm text-muted-foreground">
      {{ message }}
    </div>
  </div>
</template>
