<script setup lang="ts">
import type { TableColumn, TableSortingState } from '../index.vue'
import { computed, shallowRef } from 'vue'

interface Task {
  id: string
  title: string
  owner: string
  priority: string
  updatedAt: string
}

const columns: TableColumn<Task>[] = [
  {
    accessorKey: 'title',
    header: '任务',
  },
  {
    accessorKey: 'owner',
    header: '负责人',
  },
  {
    accessorKey: 'priority',
    header: '优先级',
    enableSorting: true,
  },
  {
    accessorKey: 'updatedAt',
    header: '更新时间',
    enableSorting: true,
  },
]

const data: Task[] = [
  { id: 't-001', title: '完善组件文档', owner: '林舟', priority: '中', updatedAt: '2026-05-23' },
  { id: 't-002', title: '同步设计变量', owner: '陈念', priority: '高', updatedAt: '2026-05-22' },
  { id: 't-003', title: '整理示例数据', owner: '周衡', priority: '低', updatedAt: '2026-05-21' },
  { id: 't-004', title: '回归交互状态', owner: '沈若', priority: '中', updatedAt: '2026-05-20' },
]

const priorityRank: Record<Task['priority'], number> = {
  高: 3,
  中: 2,
  低: 1,
}

const sorting = shallowRef<TableSortingState>([])

function getSortValue(row: Task, key: keyof Task) {
  if (key === 'priority') {
    return priorityRank[row.priority]
  }

  return row[key]
}

function compareSortValue(a: string | number, b: string | number) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }

  return String(a).localeCompare(String(b), 'zh-CN', { numeric: true })
}

const sortedData = computed(() => {
  if (!sorting.value.length) {
    return data
  }

  return [...data].sort((a, b) => {
    for (const sort of sorting.value) {
      const key = sort.id as keyof Task
      const aVal = getSortValue(a, key)
      const bVal = getSortValue(b, key)

      if (aVal === bVal) {
        continue
      }

      const result = compareSortValue(aVal, bVal)
      return sort.desc ? -result : result
    }

    return 0
  })
})

const sortingText = computed(() => {
  if (!sorting.value.length) {
    return '暂无排序'
  }

  return sorting.value.map(item => `${item.id}: ${item.desc ? '降序' : '升序'}`).join('，')
})

function handleSortingChange(value: TableSortingState) {
  sorting.value = value
}
</script>

<template>
  <div class="space-y-4">
    <FaTable
      sortable
      row-key="id"
      :sorting
      :columns
      :data="sortedData"
      @sorting-change="handleSortingChange"
    />

    <div class="text-sm text-muted-foreground px-4 py-3 rounded-md bg-muted">
      当前排序：{{ sortingText }}
    </div>
  </div>
</template>
