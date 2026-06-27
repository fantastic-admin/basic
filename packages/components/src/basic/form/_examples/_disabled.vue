<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import FaButton from '../../button/index.vue'
import FaInput from '../../input/index.vue'
import FaSelect from '../../select/index.vue'
import FaSwitch from '../../switch/index.vue'
import FaTextarea from '../../textarea/index.vue'
import FaFormItem from '../FormItem.vue'
import FaForm from '../index.vue'

const disabled = shallowRef(true)
const submitted = shallowRef('')

const model = ref({
  name: 'Fantastic-admin',
  role: 'admin',
  remark: '禁用状态下，表单项内的控件会同步不可编辑。',
})

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '访客', value: 'guest' },
]

function handleSubmit(values: Record<string, unknown>) {
  submitted.value = JSON.stringify(values, null, 2)
}
</script>

<template>
  <div class="gap-4 grid max-w-160">
    <div class="flex gap-2 items-center">
      <FaSwitch v-model="disabled" />
      <span class="text-sm">禁用表单</span>
    </div>

    <FaForm
      :disabled="disabled"
      :model="model"
      @submit="handleSubmit"
    >
      <FaFormItem name="name" label="项目名称">
        <FaInput class="w-full" />
      </FaFormItem>
      <FaFormItem name="role" label="角色">
        <FaSelect :options="roleOptions" class="w-full" />
      </FaFormItem>
      <FaFormItem name="remark" label="备注">
        <FaTextarea class="w-full" />
      </FaFormItem>
      <div class="flex gap-2">
        <FaButton type="submit" :disabled="disabled">
          提交
        </FaButton>
        <FaButton type="reset" variant="outline" :disabled="disabled">
          重置
        </FaButton>
      </div>
    </FaForm>

    <pre v-if="submitted" class="text-sm m-0 p-4 rounded-md bg-muted">{{ submitted }}</pre>
  </div>
</template>
