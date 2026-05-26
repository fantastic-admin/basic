<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { reactive } from 'vue'
import FaButton from '../../button/index.vue'
import FaInput from '../../input/index.vue'
import FaSelect from '../../select/index.vue'
import FaSearchBar from '../index.vue'

const form = reactive({
  keyword: '',
  status: 'all',
  department: '',
  role: 'all',
  source: 'all',
  creator: '',
})

const statusOptions = [
  { label: '全部状态', value: 'all' },
  { label: '启用', value: 'enabled' },
  { label: '禁用', value: 'disabled' },
]

const roleOptions = [
  { label: '全部角色', value: 'all' },
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '访客', value: 'guest' },
]

const sourceOptions = [
  { label: '全部来源', value: 'all' },
  { label: '后台创建', value: 'admin' },
  { label: '用户注册', value: 'register' },
  { label: '批量导入', value: 'import' },
]
</script>

<template>
  <FaSearchBar>
    <template #default="{ fold }">
      <div class="gap-3 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        <FaInput v-model="form.keyword" placeholder="搜索用户名" class="w-full" />
        <FaSelect v-model="form.status" :options="statusOptions" class="w-full" />
        <FaInput v-show="!fold" v-model="form.department" placeholder="部门" class="w-full" />
        <FaSelect v-show="!fold" v-model="form.role" :options="roleOptions" class="w-full" />
        <FaSelect v-show="!fold" v-model="form.source" :options="sourceOptions" class="w-full" />
        <FaInput v-show="!fold" v-model="form.creator" placeholder="创建人" class="w-full" />
        <div class="flex gap-2 col-end--1 justify-end">
          <FaButton>查询</FaButton>
          <FaButton variant="outline">
            重置
          </FaButton>
        </div>
      </div>
    </template>
  </FaSearchBar>
</template>
