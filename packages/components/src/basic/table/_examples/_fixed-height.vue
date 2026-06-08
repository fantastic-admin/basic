<script setup lang="ts">
import type { TableColumn } from '../index.vue'

interface LogRecord {
  id: string
  event: string
  operator: string
  result: string
  time: string
}

const columns: TableColumn<LogRecord>[] = [
  {
    accessorKey: 'event',
    header: '事件',
    width: 180,
  },
  {
    accessorKey: 'operator',
    header: '操作人',
    width: 120,
  },
  {
    accessorKey: 'result',
    header: '结果',
    width: 120,
  },
  {
    accessorKey: 'time',
    header: '时间',
    width: 180,
  },
]

const data: LogRecord[] = [
  { id: 'l-001', event: '创建项目', operator: '林舟', result: '成功', time: '2026-05-23 09:12' },
  { id: 'l-002', event: '提交审批', operator: '陈念', result: '成功', time: '2026-05-23 09:26' },
  { id: 'l-003', event: '同步成员', operator: '周衡', result: '成功', time: '2026-05-23 09:41' },
  { id: 'l-004', event: '导出报表', operator: '沈若', result: '排队中', time: '2026-05-23 10:05' },
  { id: 'l-005', event: '更新预算', operator: '梁一', result: '成功', time: '2026-05-23 10:18' },
  { id: 'l-006', event: '变更负责人', operator: '许知', result: '成功', time: '2026-05-23 10:39' },
  { id: 'l-007', event: '归档任务', operator: '林舟', result: '成功', time: '2026-05-23 11:02' },
  { id: 'l-008', event: '生成快照', operator: '陈念', result: '成功', time: '2026-05-23 11:27' },
  { id: 'l-009', event: '刷新缓存', operator: '周衡', result: '成功', time: '2026-05-23 11:48' },
  { id: 'l-010', event: '权限校验', operator: '沈若', result: '成功', time: '2026-05-23 12:13' },
  { id: 'l-011', event: '发布版本', operator: '梁一', result: '成功', time: '2026-05-23 12:45' },
  { id: 'l-012', event: '关闭工单', operator: '许知', result: '成功', time: '2026-05-23 13:08' },
]
</script>

<template>
  <FaTable
    class="h-80"
    row-key="id"
    :columns
    :data
  />
</template>
