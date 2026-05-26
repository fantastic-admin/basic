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
    { label: '打开', icon: 'i-lucide:folder-open', handle: () => handleClick('打开') },
    { label: '重命名', icon: 'i-lucide:pencil', handle: () => handleClick('重命名') },
    { label: '复制链接', icon: 'i-lucide:link', handle: () => handleClick('复制链接') },
  ],
  [
    { label: '下载', icon: 'i-lucide:download', handle: () => handleClick('下载') },
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
