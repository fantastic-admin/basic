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
  <FaSearchBar :show-toggle="false">
    <template #default="{ fold, toggle }">
      <ElForm :model="search" size="default" label-width="120px">
        <ElRow>
          <ElCol :span="12">
            <ElFormItem label="姓名 / 手机号">
              <ElInput v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
            </ElFormItem>
          </ElCol>
          <ElCol v-show="!fold" :span="6">
            <ElFormItem label="部门">
              <ElSelect v-model="search.department_id" clearable placeholder="请选择部门">
                <ElOption label="技术部" :value="1" />
                <ElOption label="设计部" :value="2" />
                <ElOption label="行政部" :value="3" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol v-show="!fold" :span="6">
            <ElFormItem label="职位">
              <ElSelect v-model="search.department_job_id" clearable placeholder="请选择职位">
                <ElOption label="程序员" :value="1" />
                <ElOption label="设计师" :value="2" />
                <ElOption label="人事" :value="3" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol v-show="!fold" :span="6">
            <ElFormItem label="角色">
              <ElSelect v-model="search.role_id" clearable placeholder="请选择角色">
                <ElOption label="主管" :value="1" />
                <ElOption label="普通职员" :value="2" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol v-show="!fold" :span="6">
            <ElFormItem label="复选框">
              <ElCheckbox v-model="search.check1">
                备选项
              </ElCheckbox>
              <ElCheckbox v-model="search.check2">
                备选项
              </ElCheckbox>
            </ElFormItem>
          </ElCol>
          <ElCol :span="6" :offset="6">
            <ElFormItem label-width="0" class="action-box">
              <ElButton type="primary">
                <template #icon>
                  <FaIcon name="i-ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton link @click="toggle">
                <template #icon>
                  <FaIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top' " />
                </template>
                {{ fold ? '展开' : '收起' }}
              </ElButton>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElForm>
    </template>
  </FaSearchBar>
</template>

<style scoped>
.action-box {
  :deep(.el-form-item__content) {
    justify-content: flex-end;
  }
}
</style>
