<script setup lang="ts">
import type { TableColumn } from '../index.vue'
import { computed, shallowRef } from 'vue'

interface Member {
  id: string
  name: string
  role: string
  team: string
  locked: boolean
}

const columns: TableColumn<Member>[] = [
  {
    type: 'selection',
    fixed: 'left',
    width: 50,
    disabled: row => row.locked,
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
    accessorKey: 'locked',
    header: '锁定',
    width: 120,
  },
]

const data: Member[] = [
  { id: 'm-001', name: '沈若', role: '管理员', team: '平台组', locked: false },
  { id: 'm-002', name: '梁一', role: '开发者', team: '体验组', locked: false },
  { id: 'm-003', name: '许知', role: '访客', team: '运营组', locked: true },
  { id: 'm-004', name: '苏眠', role: '审计员', team: '风控组', locked: false },
]

const selectedRows = shallowRef<Member[]>([])

const selectedNames = computed(() => selectedRows.value.map(item => item.name).join('、') || '暂无')

function handleSelectionChange(rows: Member[]) {
  selectedRows.value = rows
}
</script>

<template>
  <div class="space-y-4">
    <FaTable
      selectable
      multiple
      row-key="id"
      :columns
      :data
      @selection-change="handleSelectionChange"
    />

    <div class="text-sm text-muted-foreground px-4 py-3 rounded-md bg-muted">
      已选中：{{ selectedNames }}
    </div>
  </div>
</template>
