<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import { useToast } from '../../toast'
import FaDropdown from '../index.vue'

interface DropdownItem {
  label: string
  handle?: () => void
}

const toast = useToast()

function handleClick(text: string) {
  toast(text)
}

const items = [
  [
    { label: '查看详情', handle: () => handleClick('查看详情') },
    { label: '编辑', handle: () => handleClick('编辑') },
    { label: '复制', handle: () => handleClick('复制') },
  ],
] satisfies DropdownItem[][]
</script>

<template>
  <FaDropdown :items="items">
    <FaButton>
      操作
      <FaIcon name="i-ep:caret-bottom" />
    </FaButton>
  </FaDropdown>
</template>
