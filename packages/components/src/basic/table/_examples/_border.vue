<script setup lang="ts">
import type { TableColumn } from '../index.vue'

interface Project {
  id: string
  name: string
  owner: string
  progress: string
  status: string
}

const columns: TableColumn<Project>[] = [
  {
    accessorKey: 'name',
    header: '项目',
    width: 220,
  },
  {
    accessorKey: 'owner',
    header: '负责人',
    width: 120,
  },
  {
    accessorKey: 'progress',
    header: '进度',
    width: 120,
    align: 'right',
  },
  {
    accessorKey: 'status',
    header: '状态',
    width: 120,
  },
]

const data: Project[] = [
  { id: 'p-001', name: '权限策略整理', owner: '林舟', progress: '72%', status: '进行中' },
  { id: 'p-002', name: '表格示例拆分', owner: '陈念', progress: '100%', status: '已完成' },
  { id: 'p-003', name: '数据导出流程', owner: '周衡', progress: '48%', status: '进行中' },
  { id: 'p-004', name: '菜单体验优化', owner: '沈若', progress: '16%', status: '待处理' },
]
</script>

<template>
  <FaTable border row-key="id" :columns :data />
</template>
