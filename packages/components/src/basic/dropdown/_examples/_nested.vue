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
    {
      label: '更多操作',
      items: [
        [
          { label: '保存页面', handle: () => handleClick('保存页面') },
          { label: '导出为 PDF', handle: () => handleClick('导出为 PDF') },
        ],
        [
          { label: '复制路径', handle: () => handleClick('复制路径') },
        ],
      ],
    },
  ],
] satisfies DropdownItems
</script>

<template>
  <FaDropdown :items="items">
    <FaButton variant="outline">
      页面操作
      <FaIcon name="i-ep:caret-bottom" />
    </FaButton>
  </FaDropdown>
</template>
