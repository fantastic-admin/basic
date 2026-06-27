<script setup lang="ts">
import type { FormLabelPlacement } from '../context'
import { ref, shallowRef } from 'vue'
import FaInput from '../../input/index.vue'
import FaNumberField from '../../number-field/index.vue'
import FaRadioGroup from '../../radio-group/index.vue'
import FaFormItem from '../FormItem.vue'
import FaForm from '../index.vue'

const labelPlacement = shallowRef<FormLabelPlacement>('left')
const labelWidth = shallowRef(150)

const model = ref({
  name: 'Fantastic-admin',
  email: 'admin@example.com',
  phone: '13800138000',
})

const labelPlacementOptions: { label: string, value: FormLabelPlacement }[] = [
  { label: 'top', value: 'top' },
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' },
]
</script>

<template>
  <div class="gap-4 grid max-w-170">
    <div class="gap-4 grid sm:grid-cols-[minmax(0,1fr)_200px]">
      <div class="gap-2 grid">
        <div class="text-sm font-medium">
          label-placement
        </div>
        <FaRadioGroup v-model="labelPlacement" :options="labelPlacementOptions" class="flex flex-wrap gap-4" />
      </div>

      <div class="gap-2 grid">
        <div class="text-sm font-medium">
          label-width
        </div>
        <FaNumberField v-model="labelWidth" :min="80" :max="240" :step="10" class="w-full" />
      </div>
    </div>

    <FaForm
      :model="model"
      :label-placement="labelPlacement"
      :label-width="labelWidth"
    >
      <FaFormItem name="name" label="项目名称">
        <FaInput class="w-full" />
      </FaFormItem>
      <FaFormItem name="email" label="邮箱地址">
        <FaInput type="email" class="w-full" />
      </FaFormItem>
      <FaFormItem name="phone" label="联系电话">
        <FaInput type="tel" class="w-full" />
      </FaFormItem>
    </FaForm>
  </div>
</template>
