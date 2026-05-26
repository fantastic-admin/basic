<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { reactive, shallowRef } from 'vue'
import FaButton from '../../button/index.vue'
import FaInput from '../../input/index.vue'
import FaSelect from '../../select/index.vue'
import FaSearchBar from '../index.vue'

const form = reactive({
  keyword: '',
  status: 'all',
  owner: '',
  priority: 'all',
  category: 'all',
  project: '',
  participant: '',
})

const fold = shallowRef(false)

const statusOptions = [
  { label: '全部状态', value: 'all' },
  { label: '待处理', value: 'pending' },
  { label: '已完成', value: 'done' },
]

const priorityOptions = [
  { label: '全部优先级', value: 'all' },
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' },
]

const categoryOptions = [
  { label: '全部分类', value: 'all' },
  { label: '需求', value: 'feature' },
  { label: '缺陷', value: 'bug' },
  { label: '优化', value: 'improvement' },
]
</script>

<template>
  <FaSearchBar v-model:fold="fold">
    <template #default="{ fold: isFold }">
      <div class="gap-3 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        <FaInput v-model="form.keyword" placeholder="搜索任务" class="w-full" />
        <FaSelect v-model="form.status" :options="statusOptions" class="w-full" />
        <FaInput v-show="!isFold" v-model="form.owner" placeholder="负责人" class="w-full" />
        <FaSelect v-show="!isFold" v-model="form.priority" :options="priorityOptions" class="w-full" />
        <FaSelect v-show="!isFold" v-model="form.category" :options="categoryOptions" class="w-full" />
        <FaInput v-show="!isFold" v-model="form.project" placeholder="所属项目" class="w-full" />
        <FaInput v-show="!isFold" v-model="form.participant" placeholder="参与人" class="w-full" />
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
