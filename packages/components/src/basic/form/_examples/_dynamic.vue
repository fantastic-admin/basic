<script setup lang="ts">
import type { FormExpose } from '../index'
import { ref, shallowRef, useTemplateRef } from 'vue'
import FaButton from '../../button/index.vue'
import FaInput from '../../input/index.vue'
import FaFormItem from '../FormItem.vue'
import FaForm from '../index.vue'

interface ContactValue {
  name: string
  phone: string
}

const formRef = useTemplateRef<FormExpose>('formRef')
const submitted = shallowRef('')
const model = ref<{ contacts: ContactValue[] }>({
  contacts: [
    createContact('张三', '13800138000'),
  ],
})

function createContact(name = '', phone = ''): ContactValue {
  return { name, phone }
}

function addContact() {
  model.value.contacts.push(createContact())
  formRef.value?.clearValidate()
  submitted.value = ''
}

function removeContact(index: number) {
  if (model.value.contacts.length <= 1) {
    return
  }

  model.value.contacts.splice(index, 1)
  formRef.value?.clearValidate()
  submitted.value = ''
}

function validateName(value?: string) {
  return value?.trim() ? true : '请输入联系人姓名'
}

function validatePhone(value?: string) {
  return /^1[3-9]\d{9}$/.test(value ?? '') ? true : '请输入有效手机号'
}

function handleSubmit(values: Record<string, unknown>) {
  submitted.value = JSON.stringify(values, null, 2)
}
</script>

<template>
  <div class="gap-4 grid max-w-170">
    <FaForm
      ref="formRef"
      :model="model"
      @submit="handleSubmit"
    >
      <div
        v-for="(_contact, index) in model.contacts"
        :key="index"
        class="p-3 border rounded-md gap-3 grid"
      >
        <div class="flex gap-3 items-center justify-between">
          <div class="text-sm font-medium">
            联系人 {{ index + 1 }}
          </div>
          <FaButton
            type="button"
            variant="outline"
            size="sm"
            :disabled="model.contacts.length <= 1"
            @click="removeContact(index)"
          >
            删除
          </FaButton>
        </div>

        <FaFormItem
          :name="`contacts[${index}].name`"
          label="姓名"
          required
          :rules="validateName"
        >
          <FaInput placeholder="请输入姓名" class="w-full" />
        </FaFormItem>

        <FaFormItem
          :name="`contacts[${index}].phone`"
          label="手机号"
          required
          :rules="validatePhone"
        >
          <FaInput type="tel" placeholder="请输入手机号" class="w-full" />
        </FaFormItem>
      </div>

      <div class="flex flex-wrap gap-2">
        <FaButton type="button" variant="outline" @click="addContact">
          新增联系人
        </FaButton>
        <FaButton type="submit">
          提交
        </FaButton>
      </div>
    </FaForm>

    <pre v-if="submitted" class="text-sm m-0 p-4 rounded-md bg-muted">{{ submitted }}</pre>
  </div>
</template>
