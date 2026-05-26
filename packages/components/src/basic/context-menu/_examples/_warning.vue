<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaIcon from '../../icon/index.vue'
import { useToast } from '../../toast'
import FaContextMenu from '../index.vue'

interface ContextMenuItem {
  label: string
  icon?: string
  variant?: 'default' | 'destructive'
  disabled?: boolean
  handle?: () => void
}

interface ContextMenuSubItem {
  label: string
  items: ContextMenuItems
}

type ContextMenuItems = (ContextMenuItem | ContextMenuSubItem)[][]

const toast = useToast()

function handleClick(text: string) {
  toast(text)
}

const items = [
  [
    { label: '查看详情', handle: () => handleClick('查看详情') },
    { label: '复制副本', handle: () => handleClick('复制副本') },
  ],
  [
    { label: '删除', variant: 'destructive', handle: () => handleClick('删除') },
  ],
] satisfies ContextMenuItems
</script>

<template>
  <FaContextMenu :items="items">
    <div class="text-sm border rounded-md border-dashed flex h-[150px] w-[300px] items-center justify-center">
      <FaIcon name="i-hugeicons:mouse-right-click-06" class="op-50 size-12" />
    </div>
  </FaContextMenu>
</template>
