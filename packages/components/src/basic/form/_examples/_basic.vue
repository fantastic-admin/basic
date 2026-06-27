<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import FaButton from '../../button/index.vue'
import FaInput from '../../input/index.vue'
import FaSelect from '../../select/index.vue'
import FaTextarea from '../../textarea/index.vue'
import FaFormItem from '../FormItem.vue'
import FaForm from '../index.vue'

const submitted = shallowRef('')

const model = ref({
  account: '',
  role: '',
  remark: '',
})

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '访客', value: 'guest' },
]

const validationSchema = {
  account(value: string) {
    return value ? true : '请输入账号'
  },
  role(value: string) {
    return value ? true : '请选择角色'
  },
  remark(value: string) {
    return !value || value.length >= 6 ? true : '备注至少 6 个字符'
  },
}

function handleSubmit(values: Record<string, unknown>) {
  submitted.value = JSON.stringify(values, null, 2)
}
</script>

<template>
  <div class="gap-4 grid max-w-160">
    <FaForm
      :model="model"
      :validation-schema="validationSchema"
      @submit="handleSubmit"
    >
      <FaFormItem name="account" label="账号" required description="账号将作为登录名使用">
        <FaInput placeholder="请输入账号" class="w-full" />
      </FaFormItem>
      <FaFormItem name="role" label="角色" required>
        <FaSelect :options="roleOptions" placeholder="请选择角色" class="w-full" />
      </FaFormItem>
      <FaFormItem name="remark" label="备注">
        <FaTextarea placeholder="请输入至少 6 个字符" class="w-full" />
      </FaFormItem>
      <div class="flex gap-2">
        <FaButton type="submit">
          提交
        </FaButton>
        <FaButton type="reset" variant="outline">
          重置
        </FaButton>
      </div>
    </FaForm>
    <pre v-if="submitted" class="text-sm m-0 p-4 rounded-md bg-muted">{{ submitted }}</pre>
  </div>
</template>
