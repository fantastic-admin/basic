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
    { label: '打开', handle: () => handleClick('打开') },
    { label: '复制', disabled: true, handle: () => handleClick('复制') },
    { label: '移动到', disabled: true, handle: () => handleClick('移动到') },
  ],
  [
    { label: '刷新', handle: () => handleClick('刷新') },
  ],
] satisfies DropdownItems
</script>

<template>
  <FaDropdown :items="items">
    <FaButton variant="outline">
      更多操作
      <FaIcon name="i-ep:caret-bottom" />
    </FaButton>
  </FaDropdown>
</template>
