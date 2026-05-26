<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import { useToast } from '../../toast'
import { useModal } from '../index'

const modal = useModal()
const toast = useToast()

function showInfo() {
  modal.info({
    title: '温馨提醒',
    content: '这是 info 弹窗',
    onConfirm: () => toast('你点了确定'),
  })
}

function showSuccess() {
  modal.success({
    title: '操作成功',
    content: '这是 success 弹窗',
    onConfirm: () => toast('你点了确定'),
  })
}

function showWarning() {
  modal.warning({
    title: '风险提醒',
    content: '这是 warning 弹窗',
    onConfirm: () => toast('你点了确定'),
  })
}

function showError() {
  modal.error({
    title: '操作失败',
    content: '这是 error 弹窗',
    onConfirm: () => toast('你点了确定'),
  })
}

function showConfirm() {
  modal.confirm({
    title: '确认操作',
    content: '这是 confirm 弹窗',
    onConfirm: () => toast('确认操作'),
    onCancel: () => toast('取消操作'),
  })
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaButton @click="showInfo">
      Info
    </FaButton>
    <FaButton variant="outline" @click="showSuccess">
      Success
    </FaButton>
    <FaButton variant="outline" @click="showWarning">
      Warning
    </FaButton>
    <FaButton variant="outline" @click="showError">
      Error
    </FaButton>
    <FaButton variant="secondary" @click="showConfirm">
      Confirm
    </FaButton>
  </div>
</template>
