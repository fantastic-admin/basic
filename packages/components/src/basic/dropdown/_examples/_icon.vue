<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import { useToast } from '../../toast'
import FaDropdown from '../index.vue'

interface DropdownItem {
  label: string
  icon?: string
  variant?: 'default' | 'destructive'
  disabled?: boolean
  handle?: () => void
}

interface DropdownSubItem {
  label: string
  items: DropdownItems
}

type DropdownItems = (DropdownItem | DropdownSubItem)[][]

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
] satisfies DropdownItems
</script>

<template>
  <FaDropdown :items="items">
    <FaButton variant="outline">
      文件操作
      <FaIcon name="i-ep:caret-bottom" />
    </FaButton>
  </FaDropdown>
</template>
