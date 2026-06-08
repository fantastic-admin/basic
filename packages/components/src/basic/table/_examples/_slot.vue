<script setup lang="ts">
import type { TableColumn } from '../index.vue'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'available' | 'warning' | 'sold-out'
}

const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'name',
    header: '商品',
    width: 220,
  },
  {
    accessorKey: 'category',
    header: '分类',
    width: 120,
  },
  {
    accessorKey: 'price',
    header: '价格',
    align: 'right',
    width: 120,
  },
  {
    accessorKey: 'stock',
    header: '库存',
    align: 'right',
    width: 120,
  },
  {
    accessorKey: 'status',
    header: '状态',
    width: 120,
  },
]

const data: Product[] = [
  { id: 'sku-001', name: '协作空间专业版', category: '软件', price: 1280, stock: 42, status: 'available' },
  { id: 'sku-002', name: '团队数据大屏', category: '模板', price: 680, stock: 8, status: 'warning' },
  { id: 'sku-003', name: '年度支持服务', category: '服务', price: 3600, stock: 0, status: 'sold-out' },
]

const statusMap: Record<Product['status'], { label: string, class: string }> = {
  'available': {
    label: '可售',
    class: 'bg-success/10 text-success',
  },
  'warning': {
    label: '低库存',
    class: 'bg-warning/10 text-warning',
  },
  'sold-out': {
    label: '售罄',
    class: 'bg-muted text-muted-foreground',
  },
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>

<template>
  <FaTable row-key="id" :columns :data>
    <template #header-name>
      <div class="flex flex-col">
        <span>商品</span>
        <span class="text-xs text-muted-foreground font-normal">名称 / 编号</span>
      </div>
    </template>

    <template #cell-name="{ row }">
      <div class="font-medium">
        {{ row.original.name }}
      </div>
      <div class="text-xs text-muted-foreground">
        {{ row.original.id }}
      </div>
    </template>

    <template #cell-price="{ value }">
      {{ formatCurrency(Number(value)) }}
    </template>

    <template #cell-stock="{ value }">
      <span class="tabular-nums">{{ value }}</span>
    </template>

    <template #cell-status="{ value }">
      <span class="text-xs font-medium px-2 py-0.5 rounded-full inline-flex" :class="statusMap[value as Product['status']].class">
        {{ statusMap[value as Product['status']].label }}
      </span>
    </template>
  </FaTable>
</template>
