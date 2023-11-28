<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'ComponentExampleSearchbar',
})

const search = ref({
  name: '',
  department_id: '',
  department_job_id: '',
  role_id: '',
  check1: true,
  check2: false,
})

const isFold = ref(false)
const isFold2 = ref(true)
const isFold3 = ref(true)

function toggle(fold: boolean) {
  ElMessage({
    message: fold ? '收起' : '展开',
  })
}
</script>

<template>
  <div>
    <PageHeader title="搜索面板" content="SearchBar" />
    <PageMain>
      <SearchBar>
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
                <ElFormItem label="角色">
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
                  <SvgIcon name="ep:search" />
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
      </SearchBar>
    </PageMain>
    <PageMain title="默认展开">
      <SearchBar :fold="isFold">
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
                  <ElCheckbox v-model="search.check1">
                    备选项
                  </ElCheckbox>
                  <ElCheckbox v-model="search.check2">
                    备选项
                  </ElCheckbox>
                </ElFormItem>
              </ElCol>
            </ElRow>
            <ElFormItem>
              <ElButton type="primary">
                <template #icon>
                  <SvgIcon name="ep:search" />
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
      </SearchBar>
    </PageMain>
    <PageMain title="显示背景">
      <SearchBar background>
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
                  <SvgIcon name="ep:search" />
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
      </SearchBar>
    </PageMain>
    <PageMain title="切换事件">
      <SearchBar @toggle="toggle">
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
                  <SvgIcon name="ep:search" />
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
      </SearchBar>
    </PageMain>
    <PageMain title="自定义切换按钮（搭配自定义 grid 布局）">
      <SearchBar :fold="isFold2" :show-toggle="false">
        <template #default="{ fold }">
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
                  <SvgIcon name="ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton link @click="isFold2 = !fold">
                <template #icon>
                  <SvgIcon :name="fold ? 'ep:caret-bottom' : 'ep:caret-top' " />
                </template>
                {{ fold ? '展开' : '收起' }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </SearchBar>
    </PageMain>
    <PageMain title="自定义切换按钮（搭配 el-row 组件）">
      <SearchBar :fold="isFold3" :show-toggle="false">
        <template #default="{ fold }">
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
                      <SvgIcon name="ep:search" />
                    </template>
                    筛选
                  </ElButton>
                  <ElButton link @click="isFold3 = !fold">
                    <template #icon>
                      <SvgIcon :name="fold ? 'ep:caret-bottom' : 'ep:caret-top' " />
                    </template>
                    {{ fold ? '展开' : '收起' }}
                  </ElButton>
                </ElFormItem>
              </ElCol>
            </ElRow>
          </ElForm>
        </template>
      </SearchBar>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
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

.action-box {
  :deep(.el-form-item__content) {
    justify-content: flex-end;
  }
}
</style>
