<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { toast } from 'vue-sonner'

defineOptions({
  name: 'ComponentExampleArea',
})

const pcas1 = ref([])
const pcas2 = ref([])
const pcas3 = ref([])
const pcasCode = ref(['33', '3301', '330106'])
const pcasName = ref(['浙江省', '杭州市', '西湖区'])
const pcasBoth = ref([
  { code: '33', name: '浙江省' },
  { code: '3301', name: '杭州市' },
  { code: '330106', name: '西湖区' },
])

const formRef = useTemplateRef<FormInstance>('formRef')
const ruleForm = ref({
  pca: [],
})
const rules = ref<FormRules>({
  pca: [
    { type: 'array', required: true, message: '请选择地区', trigger: 'change' },
  ],
})
function submitForm() {
  formRef.value?.validate((valid) => {
    if (valid) {
      toast.success('提交成功')
    }
  })
}
</script>

<template>
  <div>
    <FaPageHeader title="省市区街道联动" description="PcasCascader" />
    <FaPageMain title="多级联动">
      <p>省份/城市联动</p>
      <PcasCascader v-model="pcas1" type="pc" />
      <p>省份/城市/区县联动</p>
      <PcasCascader v-model="pcas2" />
      <p>省份/城市/区县/街道联动</p>
      <PcasCascader v-model="pcas3" type="pcas" />
    </FaPageMain>
    <FaPageMain title="数据格式化">
      <p>{{ pcasCode }}</p>
      <PcasCascader v-model="pcasCode" />
      <p>{{ pcasName }}</p>
      <PcasCascader v-model="pcasName" format="name" />
      <p>{{ pcasBoth }}</p>
      <PcasCascader v-model="pcasBoth" format="both" />
    </FaPageMain>
    <FaPageMain title="表单验证">
      <ElForm ref="formRef" :model="ruleForm" :rules="rules">
        <ElFormItem label="地区" prop="pca">
          <PcasCascader v-model="ruleForm.pca" />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="submitForm">
            提交
          </ElButton>
        </ElFormItem>
      </ElForm>
    </FaPageMain>
  </div>
</template>
