<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { reactive } from 'vue'
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import FaInput from '../../input/index.vue'
import FaSelect from '../../select/index.vue'
import FaSearchBar from '../index.vue'

const form = reactive({
  keyword: '',
  status: 'all',
  tag: '',
  column: 'all',
  author: '',
  reviewer: '',
  publishTime: 'all',
})

const statusOptions = [
  { label: '全部状态', value: 'all' },
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
]

const columnOptions = [
  { label: '全部栏目', value: 'all' },
  { label: '产品动态', value: 'product' },
  { label: '帮助中心', value: 'help' },
  { label: '活动公告', value: 'campaign' },
]

const publishTimeOptions = [
  { label: '发布时间', value: 'all' },
  { label: '今天', value: 'today' },
  { label: '近 7 天', value: 'week' },
  { label: '近 30 天', value: 'month' },
]
</script>

<template>
  <FaSearchBar :show-toggle="false">
    <template #default="{ fold, toggle }">
      <div class="gap-3 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        <FaInput v-model="form.keyword" placeholder="搜索文章" class="w-full" />
        <FaSelect v-model="form.status" :options="statusOptions" class="w-full" />
        <FaInput v-show="!fold" v-model="form.tag" placeholder="标签" class="w-full" />
        <FaSelect v-show="!fold" v-model="form.column" :options="columnOptions" class="w-full" />
        <FaInput v-show="!fold" v-model="form.author" placeholder="作者" class="w-full" />
        <FaInput v-show="!fold" v-model="form.reviewer" placeholder="审核人" class="w-full" />
        <FaSelect v-show="!fold" v-model="form.publishTime" :options="publishTimeOptions" class="w-full" />
        <div class="flex gap-2 col-end--1 justify-end">
          <FaButton>查询</FaButton>
          <FaButton variant="outline">
            重置
          </FaButton>
          <FaButton variant="ghost" @click="toggle">
            {{ fold ? '展开' : '收起' }}
            <FaIcon :name="fold ? 'i-lucide:chevron-down' : 'i-lucide:chevron-up'" />
          </FaButton>
        </div>
      </div>
    </template>
  </FaSearchBar>
</template>
