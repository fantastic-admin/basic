<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

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

const formRef = ref<FormInstance>()
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
      ElMessage('提交成功')
    }
  })
}
</script>

<template>
  <div>
    <page-header title="省市区街道联动" content="PcasCascader" />
    <page-main title="多级联动">
      <p>省份/城市联动</p>
      <pcas-cascader v-model="pcas1" type="pc" />
      <p>省份/城市/区县联动</p>
      <pcas-cascader v-model="pcas2" />
      <p>省份/城市/区县/街道联动</p>
      <pcas-cascader v-model="pcas3" type="pcas" />
    </page-main>
    <page-main title="数据格式化">
      <p>{{ pcasCode }}</p>
      <pcas-cascader v-model="pcasCode" />
      <p>{{ pcasName }}</p>
      <pcas-cascader v-model="pcasName" format="name" />
      <p>{{ pcasBoth }}</p>
      <pcas-cascader v-model="pcasBoth" format="both" />
    </page-main>
    <page-main title="表单验证">
      <el-form ref="formRef" :model="ruleForm" :rules="rules">
        <el-form-item label="地区" prop="pca">
          <pcas-cascader v-model="ruleForm.pca" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </page-main>
  </div>
</template>
