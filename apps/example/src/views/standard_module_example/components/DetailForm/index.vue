<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
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

const loading = ref(false)
const formRef = useTemplateRef<FormInstance>('formRef')
const form = ref({
  id: props.id,
  title: '',
})
const formRules = ref<FormRules>({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
})

onMounted(() => {
  if (form.value.id !== '') {
    getInfo()
  }
})

function getInfo() {
  loading.value = true
  apiStandardModule.detail(form.value.id).then((res: any) => {
    loading.value = false
    form.value.title = res.data.title
  }).catch(() => {
    loading.value = false
  })
}

defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (form.value.id === '') {
            apiStandardModule.create(form.value).then(() => {
              faToast.success('新增成功')
              resolve()
            })
          }
          else {
            apiStandardModule.edit(form.value).then(() => {
              faToast.success('编辑成功')
              resolve()
            })
          }
        }
      })
    })
  },
})
</script>

<template>
  <div v-loading="loading">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="120px" label-suffix="：">
      <ElFormItem label="标题" prop="title">
        <FaInput v-model="form.title" placeholder="请输入标题" class="w-full" />
      </ElFormItem>
    </ElForm>
  </div>
</template>
