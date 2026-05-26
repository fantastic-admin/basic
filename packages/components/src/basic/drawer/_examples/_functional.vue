<script setup lang="ts">
import { h } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import { useToast } from '../../toast'
import { useDrawer } from '../index'

const toast = useToast()

const { open } = useDrawer().create({
  title: '函数式调用',
  description: '通过 useDrawer().create() 创建抽屉。',
  content: h('div', { class: 'text-sm text-muted-foreground leading-6' }, '这里是函数式调用渲染的内容。'),
  showCancelButton: true,
  onConfirm: () => toast('确认操作'),
  onCancel: () => toast('取消操作'),
})
</script>

<template>
  <FaButton @click="open">
    打开抽屉
  </FaButton>
</template>
