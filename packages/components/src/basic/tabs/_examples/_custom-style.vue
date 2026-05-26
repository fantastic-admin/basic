<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaTabs from '../index.vue'

const activeTab = ref('overview')

const list = [
  { label: '总览', value: 'overview', class: 'rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' },
  { label: '趋势', value: 'trend', class: 'rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' },
  { label: '明细', value: 'detail', class: 'rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' },
]
</script>

<template>
  <FaTabs
    v-model="activeTab"
    :list="list"
    class="p-3 border rounded-lg w-96"
    list-class="gap-2 rounded-md bg-transparent p-0"
    content-class="rounded-md bg-muted/50 p-4 text-sm"
  >
    <template #overview>
      当前数据总览。
    </template>
    <template #trend>
      趋势分析内容。
    </template>
    <template #detail>
      明细数据内容。
    </template>
  </FaTabs>
</template>
