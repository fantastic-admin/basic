<script setup lang="ts">
import type { TableColumn } from '../index.vue'

interface Task {
  id: string
  title: string
  owner: string
  priority: string
  status: string
  updatedAt: string
}

const columns: TableColumn<Task>[] = [
  {
    accessorKey: 'title',
    header: '任务',
    enableHiding: false,
  },
  {
    accessorKey: 'owner',
    header: '负责人',
  },
  {
    accessorKey: 'priority',
    header: '优先级',
  },
  {
    accessorKey: 'status',
    header: '状态',
  },
  {
    accessorKey: 'updatedAt',
    header: '更新时间',
  },
]

const data: Task[] = [
  { id: 't-001', title: '完善组件文档', owner: '林舟', priority: '中', status: '进行中', updatedAt: '2026-05-23' },
  { id: 't-002', title: '同步设计变量', owner: '陈念', priority: '高', status: '待处理', updatedAt: '2026-05-22' },
  { id: 't-003', title: '整理示例数据', owner: '周衡', priority: '低', status: '已完成', updatedAt: '2026-05-21' },
  { id: 't-004', title: '回归交互状态', owner: '沈若', priority: '中', status: '进行中', updatedAt: '2026-05-20' },
]
</script>

<template>
  <FaTable column-visibility :columns :data />
</template>
