<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { reactive } from 'vue'
import FaButton from '../../button/index.vue'
import FaInput from '../../input/index.vue'
import FaSelect from '../../select/index.vue'
import FaSearchBar from '../index.vue'

const form = reactive({
  keyword: '',
  type: 'all',
  creator: '',
  channel: 'all',
  visibility: 'all',
  reviewer: '',
})

const typeOptions = [
  { label: '全部类型', value: 'all' },
  { label: '公告', value: 'notice' },
  { label: '消息', value: 'message' },
]

const channelOptions = [
  { label: '全部渠道', value: 'all' },
  { label: '站内', value: 'site' },
  { label: '邮件', value: 'email' },
  { label: '短信', value: 'sms' },
]

const visibilityOptions = [
  { label: '全部范围', value: 'all' },
  { label: '公开', value: 'public' },
  { label: '内部', value: 'internal' },
  { label: '指定用户', value: 'specific' },
]
</script>

<template>
  <FaSearchBar background>
    <template #default="{ fold }">
      <div class="gap-3 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        <FaInput v-model="form.keyword" placeholder="搜索标题" class="w-full" />
        <FaSelect v-model="form.type" :options="typeOptions" class="w-full" />
        <FaInput v-show="!fold" v-model="form.creator" placeholder="创建人" class="w-full" />
        <FaSelect v-show="!fold" v-model="form.channel" :options="channelOptions" class="w-full" />
        <FaSelect v-show="!fold" v-model="form.visibility" :options="visibilityOptions" class="w-full" />
        <FaInput v-show="!fold" v-model="form.reviewer" placeholder="审核人" class="w-full" />
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
