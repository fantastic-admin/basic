<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import { useToast } from '../index'

const toast = useToast()

function showToast() {
  toast('文件已移入回收站', {
    description: '你可以在 30 天内恢复该文件',
    action: {
      label: '撤销',
      onClick: () => {
        toast.success('已撤销删除')
      },
    },
  })
}
</script>

<template>
  <FaButton @click="showToast">
    显示操作按钮
  </FaButton>
</template>
