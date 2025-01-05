<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { useFaModal } from '@/ui/components/FaModal'

const tipsSwitch = ref(true)

const FaModal = useFaModal()

onBeforeRouteLeave((_from, _to, next) => {
  if (tipsSwitch.value) {
    FaModal.confirm({
      title: '温馨提醒',
      content: '当前页面还没有保存，是否确定要离开？',
      confirmButtonText: '确定离开',
      onConfirm: () => {
        next()
      },
    })
  }
  else {
    next()
  }
})
</script>

<template>
  <div>
    <FaPageHeader title="页面离开提醒" description="在页面离开时，增加弹窗二次确认，避免因误操作导致当前页面数据清空" />
    <FaPageMain>
      <ElSwitch v-model="tipsSwitch" active-text="开启提醒" inactive-text="关闭提醒" />
    </FaPageMain>
  </div>
</template>
