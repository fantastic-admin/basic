<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

const tipsSwitch = ref(true)

onBeforeRouteLeave((from, to, next) => {
  if (tipsSwitch.value) {
    ElMessageBox.confirm('当前页面还没有保存，是否确定要离开？', '温馨提醒', {
      confirmButtonText: '确定离开',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      next()
    }).catch(() => {})
  }
  else {
    next()
  }
})
</script>

<template>
  <div>
    <PageHeader title="页面离开提醒" content="在页面离开时，增加弹窗二次确认，避免因误操作导致当前页面数据清空" />
    <PageMain>
      <ElSwitch v-model="tipsSwitch" active-text="开启提醒" inactive-text="关闭提醒" />
    </PageMain>
  </div>
</template>
