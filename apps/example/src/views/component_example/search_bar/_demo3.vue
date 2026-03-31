<script setup lang="ts">
const search = ref({
  name: '',
  department_id: '',
  department_job_id: '',
  role_id: '',
  check1: true,
  check2: false,
})
</script>

<template>
  <FaSearchBar background>
    <template #default="{ fold }">
      <ElForm :model="search" size="default" label-width="120px">
        <ElRow>
          <ElCol :span="12">
            <ElFormItem label="姓名 / 手机号">
              <ElInput v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow v-show="!fold">
          <ElCol :span="6">
            <ElFormItem label="部门">
              <ElSelect v-model="search.department_id" clearable placeholder="请选择部门">
                <ElOption label="技术部" :value="1" />
                <ElOption label="设计部" :value="2" />
                <ElOption label="行政部" :value="3" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem label="职位">
              <ElSelect v-model="search.department_job_id" clearable placeholder="请选择职位">
                <ElOption label="程序员" :value="1" />
                <ElOption label="设计师" :value="2" />
                <ElOption label="人事" :value="3" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem label="角色">
              <ElSelect v-model="search.role_id" clearable placeholder="请选择角色">
                <ElOption label="主管" :value="1" />
                <ElOption label="普通职员" :value="2" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow v-show="!fold">
          <ElCol :span="24">
            <ElFormItem label="复选框">
              <ElCheckbox :value="true">
                备选项
              </ElCheckbox>
              <ElCheckbox :value="false">
                备选项
              </ElCheckbox>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElFormItem>
          <ElButton type="primary">
            <template #icon>
              <FaIcon name="i-ep:search" />
            </template>
            筛选
          </ElButton>
          <ElButton>导出</ElButton>
          <ElButton type="primary" link>
            查看已导出记录
          </ElButton>
        </ElFormItem>
      </ElForm>
    </template>
  </FaSearchBar>
</template>
