<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import { useModal } from '../../modal'
import FaSwitch from '../index.vue'

const checked = ref(false)
const modal = useModal()

function handleBeforeChange() {
  return new Promise<boolean>((resolve) => {
    modal.confirm({
      title: '确认信息',
      content: '确认要切换当前状态吗？',
      onConfirm: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      },
    })
  })
}
</script>

<template>
  <FaSwitch v-model="checked" :before-change="handleBeforeChange" />
</template>
