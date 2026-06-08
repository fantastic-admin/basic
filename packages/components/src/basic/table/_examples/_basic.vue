<script setup lang="ts">
import type { TableColumn } from '../index.vue'

interface Task {
  id: string
  title: string
  owner: string
  status: string
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
    accessorKey: 'status',
    header: '状态',
  },
  {
    accessorKey: 'updatedAt',
    header: '更新时间',
  },
]

const data: Task[] = [
  { id: 't-001', title: '完善组件文档', owner: '林舟', status: '进行中', updatedAt: '2026-05-23' },
  { id: 't-002', title: '同步设计变量', owner: '陈念', status: '待处理', updatedAt: '2026-05-22' },
  { id: 't-003', title: '整理示例数据', owner: '周衡', status: '已完成', updatedAt: '2026-05-21' },
  { id: 't-004', title: '回归交互状态', owner: '沈若', status: '进行中', updatedAt: '2026-05-20' },
]
</script>

<template>
  <FaTable :columns :data />
</template>
