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
    { label: '个人设置', icon: 'i-lucide:user', handle: () => handleClick('个人设置') },
    { label: '账号安全', icon: 'i-lucide:shield', handle: () => handleClick('账号安全') },
  ],
] satisfies DropdownItems
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaDropdown :items="items" align="start">
      <FaButton variant="outline">
        Start
        <FaIcon name="i-ep:caret-bottom" />
      </FaButton>
    </FaDropdown>
    <FaDropdown :items="items" align="center">
      <FaButton variant="outline">
        Center
        <FaIcon name="i-ep:caret-bottom" />
      </FaButton>
    </FaDropdown>
    <FaDropdown :items="items" align="end">
      <FaButton variant="outline">
        End
        <FaIcon name="i-ep:caret-bottom" />
      </FaButton>
    </FaDropdown>
  </div>
</template>
