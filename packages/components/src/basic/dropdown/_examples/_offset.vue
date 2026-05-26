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
    { label: '新建文件', icon: 'i-lucide:file-plus', handle: () => handleClick('新建文件') },
    { label: '新建文件夹', icon: 'i-lucide:folder-plus', handle: () => handleClick('新建文件夹') },
  ],
] satisfies DropdownItems
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaDropdown :items="items" :side-offset="12">
      <FaButton variant="outline">
        Side offset
        <FaIcon name="i-ep:caret-bottom" />
      </FaButton>
    </FaDropdown>
    <FaDropdown :items="items" align="start" :align-offset="24">
      <FaButton variant="outline">
        Align offset
        <FaIcon name="i-ep:caret-bottom" />
      </FaButton>
    </FaDropdown>
    <FaDropdown :items="items" :side-offset="12" :align-offset="-24">
      <FaButton variant="outline">
        Both
        <FaIcon name="i-ep:caret-bottom" />
      </FaButton>
    </FaDropdown>
  </div>
</template>
