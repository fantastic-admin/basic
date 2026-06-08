<script setup lang="ts">
import type { TableColumn } from '../index.vue'

interface Metric {
  id: string
  name: string
  today: string
  yesterday: string
  trend: string
}

const columns: TableColumn<Metric>[] = [
  {
    accessorKey: 'name',
    label: '指标名称',
    width: 180,
    cellClass: 'font-medium bg-amber-200/80 dark:bg-amber-500/35',
  },
  {
    accessorKey: 'today',
    header: '今日',
    align: 'right',
    width: 120,
    cellClass: 'tabular-nums',
  },
  {
    accessorKey: 'yesterday',
    header: '昨日',
    align: 'right',
    width: 120,
    cellClass: 'tabular-nums text-muted-foreground',
  },
  {
    accessorKey: 'trend',
    title: '变化',
    align: 'right',
    width: 120,
    headerClass: 'text-primary',
    cellClass: ({ row }) => row.original.trend.startsWith('+')
      ? 'text-success font-medium tabular-nums'
      : 'text-destructive font-medium tabular-nums',
  },
]

const data: Metric[] = [
  { id: 'm-001', name: '访问量', today: '18,420', yesterday: '16,280', trend: '+13.1%' },
  { id: 'm-002', name: '转化率', today: '8.6%', yesterday: '9.1%', trend: '-0.5%' },
  { id: 'm-003', name: '新增客户', today: '326', yesterday: '304', trend: '+7.2%' },
]
</script>

<template>
  <FaTable row-key="id" :columns :data />
</template>
