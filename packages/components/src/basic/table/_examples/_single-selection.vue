<script setup lang="ts">
import type { TableColumn } from '../index.vue'
import { computed, shallowRef } from 'vue'

interface Member {
  id: string
  name: string
  role: string
  team: string
  enabled: boolean
}

const columns: TableColumn<Member>[] = [
  {
    type: 'selection',
    fixed: 'left',
    width: 50,
    disabled: row => !row.enabled,
  },
  {
    accessorKey: 'name',
    header: '成员',
  },
  {
    accessorKey: 'role',
    header: '角色',
    width: 120,
  },
  {
    accessorKey: 'team',
    header: '团队',
    width: 140,
  },
  {
    accessorKey: 'enabled',
    header: '是否可选',
    width: 120,
  },
]

const data: Member[] = [
  { id: 'm-001', name: '沈若', role: '管理员', team: '平台组', enabled: true },
  { id: 'm-002', name: '梁一', role: '开发者', team: '体验组', enabled: true },
  { id: 'm-003', name: '许知', role: '访客', team: '运营组', enabled: false },
  { id: 'm-004', name: '苏眠', role: '审计员', team: '风控组', enabled: true },
]

const selectedRows = shallowRef<Member[]>([])

const selectedName = computed(() => selectedRows.value[0]?.name || '暂无')

function handleSelectionChange(rows: Member[]) {
  selectedRows.value = rows
}
</script>

<template>
  <div class="space-y-4">
    <FaTable
      selectable
      row-key="id"
      :columns
      :data
      @selection-change="handleSelectionChange"
    />

    <div class="text-sm text-muted-foreground px-4 py-3 rounded-md bg-muted">
      当前选中：{{ selectedName }}
    </div>
  </div>
</template>
