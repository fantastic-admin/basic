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
    { label: 'Preview', icon: 'i-lucide:eye', handle: () => handleClick('Preview') },
    { label: 'Duplicate', icon: 'i-lucide:copy', handle: () => handleClick('Duplicate') },
  ],
] satisfies DropdownItems
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaDropdown :items="items" side="top">
      <FaButton variant="outline">
        Top
        <FaIcon name="i-ep:caret-top" />
      </FaButton>
    </FaDropdown>
    <FaDropdown :items="items" side="right">
      <FaButton variant="outline">
        Right
        <FaIcon name="i-ep:caret-right" />
      </FaButton>
    </FaDropdown>
    <FaDropdown :items="items" side="bottom">
      <FaButton variant="outline">
        Bottom
        <FaIcon name="i-ep:caret-bottom" />
      </FaButton>
    </FaDropdown>
    <FaDropdown :items="items" side="left">
      <FaButton variant="outline">
        Left
        <FaIcon name="i-ep:caret-left" />
      </FaButton>
    </FaDropdown>
  </div>
</template>
