<script setup lang="ts">
import type { FormExpose } from '@fantastic-admin/components'
import apiStandardModule from '@/api/modules/standardModule'

export interface Props {
  id?: number | string
}
const props = withDefaults(
  defineProps<Props>(),
  {
    id: '',
  },
)

interface DetailFormModel {
  id: number | string
  title: string
}

const loading = ref(false)
const formRef = useTemplateRef<FormExpose>('formRef')
const model = ref<DetailFormModel>({
  id: props.id,
  title: '',
})

const validationSchema = {
  title(value: string) {
    return value ? true : '请输入标题'
  },
}

onMounted(() => {
  if (model.value.id !== '') {
    getInfo()
  }
})

function getInfo() {
  loading.value = true
  apiStandardModule.detail(model.value.id).then((res: any) => {
    loading.value = false
    model.value.title = res.data.title
  }).catch(() => {
    loading.value = false
  })
}

async function submit() {
  const result = await formRef.value?.validate()

  if (!result?.valid) {
    return false
  }

  if (model.value.id === '') {
    await apiStandardModule.create(model.value)
    useFaToast().success('新增成功')
  }
  else {
    await apiStandardModule.edit(model.value)
    useFaToast().success('编辑成功')
  }

  return true
}

defineExpose({
  submit,
})
</script>

<template>
  <div v-loading="loading">
    <FaForm
      ref="formRef"
      :model="model"
      :validation-schema="validationSchema"
      label-placement="right"
      :label-width="120"
    >
      <FaFormItem name="title" label="标题" required>
        <FaInput placeholder="请输入标题" class="w-full" />
      </FaFormItem>
    </FaForm>
  </div>
</template>
