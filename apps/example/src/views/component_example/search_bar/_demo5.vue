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
      <ElForm :model="search" size="default" label-width="120px" inline class="search-form">
        <ElFormItem label="姓名 / 手机号" class="search-form-item-name">
          <ElInput v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
        </ElFormItem>
        <ElFormItem v-show="!fold" label="部门">
          <ElSelect v-model="search.department_id" clearable placeholder="请选择部门">
            <ElOption label="技术部" :value="1" />
            <ElOption label="设计部" :value="2" />
            <ElOption label="行政部" :value="3" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem v-show="!fold" label="职位">
          <ElSelect v-model="search.department_job_id" clearable placeholder="请选择职位">
            <ElOption label="程序员" :value="1" />
            <ElOption label="设计师" :value="2" />
            <ElOption label="人事" :value="3" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem v-show="!fold" label="角色">
          <ElSelect v-model="search.role_id" clearable placeholder="请选择角色">
            <ElOption label="主管" :value="1" />
            <ElOption label="普通职员" :value="2" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem v-show="!fold" label="复选框">
          <ElCheckbox v-model="search.check1">
            备选项
          </ElCheckbox>
          <ElCheckbox v-model="search.check2">
            备选项
          </ElCheckbox>
        </ElFormItem>
        <ElFormItem>
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
      </ElForm>
    </template>
  </FaSearchBar>
</template>

<style scoped>
.search-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));

  :deep(.el-form-item) {
    grid-column: auto / span 1;

    &:last-child {
      grid-column-end: -1;

      .el-form-item__content {
        justify-content: flex-end;
      }
    }

    &.search-form-item-name {
      grid-column: auto / span 2;
    }
  }
}
</style>
