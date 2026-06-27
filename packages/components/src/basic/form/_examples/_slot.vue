<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import FaButton from '../../button/index.vue'
import { Checkbox as FaCheckbox } from '../../checkbox/checkbox'
import FaInput from '../../input/index.vue'
import FaFormItem from '../FormItem.vue'
import FaForm from '../index.vue'

const result = shallowRef('')

const model = ref({
  email: '',
  agreement: false,
})

const validationSchema = {
  email(value: string) {
    return /^\S[^\s@]*@\S[^\s.]*\.\S+$/.test(value) ? true : '请输入有效邮箱'
  },
  agreement(value: boolean) {
    return value ? true : '请先同意服务协议'
  },
}

function handleSubmit(values: Record<string, unknown>) {
  result.value = JSON.stringify(values, null, 2)
}
</script>

<template>
  <div class="gap-4 grid max-w-160">
    <FaForm
      :model="model"
      :validation-schema="validationSchema"
      @submit="handleSubmit"
    >
      <FaFormItem name="email" required>
        <template #label>
          <span>邮箱</span>
          <span class="text-destructive">*</span>
        </template>
        <FaInput type="email" placeholder="name@example.com" class="w-full" />
        <template #description>
          用于接收账号通知和安全提醒
        </template>
      </FaFormItem>

      <FaFormItem name="agreement">
        <template #default="{ componentField }">
          <div class="flex gap-2 items-center">
            <FaCheckbox
              :model-value="componentField.modelValue as boolean"
              @update:model-value="componentField['onUpdate:modelValue']?.($event as boolean)"
            />
            <span class="text-sm">我已阅读并同意服务协议</span>
          </div>
        </template>
      </FaFormItem>

      <FaButton type="submit">
        提交
      </FaButton>
    </FaForm>
    <pre v-if="result" class="text-sm m-0 p-4 rounded-md bg-muted">{{ result }}</pre>
  </div>
</template>
