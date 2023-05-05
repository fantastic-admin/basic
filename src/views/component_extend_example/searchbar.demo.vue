<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup name="ComponentExampleSearchbar">
import { ElMessage } from 'element-plus'

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
    <page-header title="搜索面板" content="SearchBar" />
    <page-main>
      <search-bar>
        <template #default="{ fold }">
          <el-form :model="search" size="default" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名 / 手机号">
                  <el-input v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="!fold">
              <el-col :span="6">
                <el-form-item label="部门">
                  <el-select v-model="search.department_id" clearable placeholder="请选择部门">
                    <el-option label="技术部" :value="1" />
                    <el-option label="设计部" :value="2" />
                    <el-option label="行政部" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="职位">
                  <el-select v-model="search.department_job_id" clearable placeholder="请选择职位">
                    <el-option label="程序员" :value="1" />
                    <el-option label="设计师" :value="2" />
                    <el-option label="人事" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="角色">
                  <el-select v-model="search.role_id" clearable placeholder="请选择角色">
                    <el-option label="主管" :value="1" />
                    <el-option label="普通职员" :value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="!fold">
              <el-col :span="24">
                <el-form-item label="角色">
                  <el-checkbox :value="true">
                    备选项
                  </el-checkbox>
                  <el-checkbox :value="false">
                    备选项
                  </el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary">
                <template #icon>
                  <el-icon>
                    <svg-icon name="ep:search" />
                  </el-icon>
                </template>
                筛选
              </el-button>
              <el-button>导出</el-button>
              <el-button type="primary" link>
                查看已导出记录
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </search-bar>
    </page-main>
    <page-main title="默认展开">
      <search-bar :fold="isFold">
        <template #default="{ fold }">
          <el-form :model="search" size="default" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名 / 手机号">
                  <el-input v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="!fold">
              <el-col :span="6">
                <el-form-item label="部门">
                  <el-select v-model="search.department_id" clearable placeholder="请选择部门">
                    <el-option label="技术部" :value="1" />
                    <el-option label="设计部" :value="2" />
                    <el-option label="行政部" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="职位">
                  <el-select v-model="search.department_job_id" clearable placeholder="请选择职位">
                    <el-option label="程序员" :value="1" />
                    <el-option label="设计师" :value="2" />
                    <el-option label="人事" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="角色">
                  <el-select v-model="search.role_id" clearable placeholder="请选择角色">
                    <el-option label="主管" :value="1" />
                    <el-option label="普通职员" :value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="!fold">
              <el-col :span="24">
                <el-form-item label="复选框">
                  <el-checkbox v-model="search.check1">
                    备选项
                  </el-checkbox>
                  <el-checkbox v-model="search.check2">
                    备选项
                  </el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary">
                <template #icon>
                  <el-icon>
                    <svg-icon name="ep:search" />
                  </el-icon>
                </template>
                筛选
              </el-button>
              <el-button>导出</el-button>
              <el-button type="primary" link>
                查看已导出记录
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </search-bar>
    </page-main>
    <page-main title="显示背景">
      <search-bar background>
        <template #default="{ fold }">
          <el-form :model="search" size="default" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名 / 手机号">
                  <el-input v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="!fold">
              <el-col :span="6">
                <el-form-item label="部门">
                  <el-select v-model="search.department_id" clearable placeholder="请选择部门">
                    <el-option label="技术部" :value="1" />
                    <el-option label="设计部" :value="2" />
                    <el-option label="行政部" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="职位">
                  <el-select v-model="search.department_job_id" clearable placeholder="请选择职位">
                    <el-option label="程序员" :value="1" />
                    <el-option label="设计师" :value="2" />
                    <el-option label="人事" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="角色">
                  <el-select v-model="search.role_id" clearable placeholder="请选择角色">
                    <el-option label="主管" :value="1" />
                    <el-option label="普通职员" :value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="!fold">
              <el-col :span="24">
                <el-form-item label="复选框">
                  <el-checkbox :value="true">
                    备选项
                  </el-checkbox>
                  <el-checkbox :value="false">
                    备选项
                  </el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary">
                <template #icon>
                  <el-icon>
                    <svg-icon name="ep:search" />
                  </el-icon>
                </template>
                筛选
              </el-button>
              <el-button>导出</el-button>
              <el-button type="primary" link>
                查看已导出记录
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </search-bar>
    </page-main>
    <page-main title="切换事件">
      <search-bar @toggle="toggle">
        <template #default="{ fold }">
          <el-form :model="search" size="default" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名 / 手机号">
                  <el-input v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="!fold">
              <el-col :span="6">
                <el-form-item label="部门">
                  <el-select v-model="search.department_id" clearable placeholder="请选择部门">
                    <el-option label="技术部" :value="1" />
                    <el-option label="设计部" :value="2" />
                    <el-option label="行政部" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="职位">
                  <el-select v-model="search.department_job_id" clearable placeholder="请选择职位">
                    <el-option label="程序员" :value="1" />
                    <el-option label="设计师" :value="2" />
                    <el-option label="人事" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="角色">
                  <el-select v-model="search.role_id" clearable placeholder="请选择角色">
                    <el-option label="主管" :value="1" />
                    <el-option label="普通职员" :value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="!fold">
              <el-col :span="24">
                <el-form-item label="复选框">
                  <el-checkbox :value="true">
                    备选项
                  </el-checkbox>
                  <el-checkbox :value="false">
                    备选项
                  </el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary">
                <template #icon>
                  <el-icon>
                    <svg-icon name="ep:search" />
                  </el-icon>
                </template>
                筛选
              </el-button>
              <el-button>导出</el-button>
              <el-button type="primary" link>
                查看已导出记录
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </search-bar>
    </page-main>
    <page-main title="自定义切换按钮（搭配自定义 flex 布局）">
      <search-bar :fold="isFold2" :show-toggle="false">
        <template #default="{ fold }">
          <el-form :model="search" size="default" label-width="120px" inline class="search-form">
            <el-form-item label="姓名 / 手机号" class="search-form-item-name">
              <el-input v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
            </el-form-item>
            <el-form-item v-show="!fold" label="部门">
              <el-select v-model="search.department_id" clearable placeholder="请选择部门">
                <el-option label="技术部" :value="1" />
                <el-option label="设计部" :value="2" />
                <el-option label="行政部" :value="3" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="职位">
              <el-select v-model="search.department_job_id" clearable placeholder="请选择职位">
                <el-option label="程序员" :value="1" />
                <el-option label="设计师" :value="2" />
                <el-option label="人事" :value="3" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="角色">
              <el-select v-model="search.role_id" clearable placeholder="请选择角色">
                <el-option label="主管" :value="1" />
                <el-option label="普通职员" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="复选框">
              <el-checkbox v-model="search.check1">
                备选项
              </el-checkbox>
              <el-checkbox v-model="search.check2">
                备选项
              </el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">
                <template #icon>
                  <el-icon>
                    <svg-icon name="ep:search" />
                  </el-icon>
                </template>
                筛选
              </el-button>
              <el-button link @click="isFold2 = !fold">
                <template #icon>
                  <el-icon>
                    <svg-icon :name="fold ? 'ep:caret-bottom' : 'ep:caret-top' " />
                  </el-icon>
                </template>
                {{ fold ? '展开' : '收起' }}
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </search-bar>
    </page-main>
    <page-main title="自定义切换按钮（搭配 el-row 组件）">
      <search-bar :fold="isFold3" :show-toggle="false">
        <template #default="{ fold }">
          <el-form :model="search" size="default" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名 / 手机号">
                  <el-input v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
                </el-form-item>
              </el-col>
              <el-col v-show="!fold" :span="6">
                <el-form-item label="部门">
                  <el-select v-model="search.department_id" clearable placeholder="请选择部门">
                    <el-option label="技术部" :value="1" />
                    <el-option label="设计部" :value="2" />
                    <el-option label="行政部" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-show="!fold" :span="6">
                <el-form-item label="职位">
                  <el-select v-model="search.department_job_id" clearable placeholder="请选择职位">
                    <el-option label="程序员" :value="1" />
                    <el-option label="设计师" :value="2" />
                    <el-option label="人事" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-show="!fold" :span="6">
                <el-form-item label="角色">
                  <el-select v-model="search.role_id" clearable placeholder="请选择角色">
                    <el-option label="主管" :value="1" />
                    <el-option label="普通职员" :value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-show="!fold" :span="6">
                <el-form-item label="复选框">
                  <el-checkbox v-model="search.check1">
                    备选项
                  </el-checkbox>
                  <el-checkbox v-model="search.check2">
                    备选项
                  </el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="6">
                <el-form-item label-width="0" class="action-box">
                  <el-button type="primary">
                    <template #icon>
                      <el-icon>
                        <svg-icon name="ep:search" />
                      </el-icon>
                    </template>
                    筛选
                  </el-button>
                  <el-button link @click="isFold3 = !fold">
                    <template #icon>
                      <el-icon>
                        <svg-icon :name="fold ? 'epcaret-bottom' : 'ep:caret-top' " />
                      </el-icon>
                    </template>
                    {{ fold ? '展开' : '收起' }}
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </search-bar>
    </page-main>
  </div>
</template>

<style lang="scss" scoped>
.search-form {
  display: flex;
  flex-wrap: wrap;

  :deep(.el-form-item) {
    flex: 1 1 300px;

    &.search-form-item-name {
      flex-basis: 450px;
    }

    &:last-child {
      margin-left: auto;

      .el-form-item__content {
        justify-content: flex-end;
      }
    }
  }
}

.action-box {
  :deep(.el-form-item__content) {
    justify-content: flex-end;
  }
}
</style>
