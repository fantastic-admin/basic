<script setup lang="ts">
import type { TableColumn } from '../index.vue'

interface Project {
  id: string
  name: string
  owner: string
  department: string
  priority: string
  status: string
  deadline: string
  budget: string
  nextAction: string
}

const columns: TableColumn<Project>[] = [
  {
    accessorKey: 'name',
    header: '项目',
    fixed: 'left',
    width: 220,
  },
  {
    accessorKey: 'owner',
    header: '负责人',
    fixed: 'left',
    width: 120,
  },
  {
    accessorKey: 'department',
    header: '所属部门',
    width: 160,
  },
  {
    accessorKey: 'priority',
    header: '优先级',
    width: 120,
  },
  {
    accessorKey: 'status',
    header: '状态',
    width: 120,
  },
  {
    accessorKey: 'deadline',
    header: '截止日期',
    width: 140,
  },
  {
    accessorKey: 'budget',
    header: '预算',
    align: 'right',
    fixed: 'right',
    width: 120,
  },
  {
    accessorKey: 'nextAction',
    header: '下一步',
    align: 'right',
    fixed: 'right',
    width: 140,
  },
]

const data: Project[] = [
  {
    id: 'p-1001',
    name: '权限中心改造',
    owner: '林舟',
    department: '基础平台部',
    priority: '高',
    status: '进行中',
    deadline: '2026-06-12',
    budget: '¥84,000',
    nextAction: '查看详情',
  },
  {
    id: 'p-1002',
    name: '移动端适配',
    owner: '陈念',
    department: '体验技术部',
    priority: '中',
    status: '评审中',
    deadline: '2026-06-18',
    budget: '¥56,000',
    nextAction: '排期',
  },
  {
    id: 'p-1003',
    name: '数据看板升级',
    owner: '周衡',
    department: '数据产品部',
    priority: '中',
    status: '已完成',
    deadline: '2026-05-30',
    budget: '¥126,000',
    nextAction: '复盘',
  },
]
</script>

<template>
  <FaTable
    row-key="id"
    table-class="min-w-[1160px]"
    :columns
    :data
  />
</template>
