<script setup lang="ts">
import type { TableColumn } from '../index.vue'

interface Task {
  id: string
  title: string
  owner: string
  status: string
  updatedAt: string
  children?: Task[]
}

const columns: TableColumn<Task>[] = [
  {
    accessorKey: 'title',
    header: '任务',
  },
  {
    accessorKey: 'owner',
    header: '负责人',
    width: 120,
  },
  {
    accessorKey: 'status',
    header: '状态',
    width: 120,
  },
  {
    accessorKey: 'updatedAt',
    header: '更新时间',
    width: 160,
  },
]

const data: Task[] = [
  {
    id: 't-001',
    title: '组件能力建设',
    owner: '林舟',
    status: '进行中',
    updatedAt: '2026-05-23',
    children: [
      { id: 't-001-1', title: '补充树型表格', owner: '林舟', status: '进行中', updatedAt: '2026-05-23' },
      { id: 't-001-2', title: '完善列显示控制', owner: '陈念', status: '待处理', updatedAt: '2026-05-22' },
    ],
  },
  {
    id: 't-002',
    title: '设计变量同步',
    owner: '陈念',
    status: '待处理',
    updatedAt: '2026-05-22',
    children: [
      {
        id: 't-002-1',
        title: '整理主题色',
        owner: '周衡',
        status: '已完成',
        updatedAt: '2026-05-21',
        children: [
          { id: 't-002-1-1', title: '校验暗色模式', owner: '沈若', status: '已完成', updatedAt: '2026-05-20' },
        ],
      },
    ],
  },
  { id: 't-003', title: '回归交互状态', owner: '沈若', status: '进行中', updatedAt: '2026-05-20' },
]
</script>

<template>
  <FaTable tree row-key="id" :columns :data />
</template>
