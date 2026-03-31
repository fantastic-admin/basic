<script setup lang="ts">
const modal = ref(false)
const modalInfo = ref({
  maximizable: false,
  closable: true,
  draggable: false,
  alignCenter: false,
  center: false,
  header: true,
  footer: true,
  contentHeight: '',
  loading: false,
  class: '',
})
watch(() => modalInfo.value.loading, (loading) => {
  if (loading) {
    setTimeout(() => {
      modalInfo.value.loading = false
    }, 3000)
  }
})

function handleBeforeClose(action: 'confirm' | 'cancel' | 'close', done: () => void) {
  if (action === 'close') {
    useFaModal().confirm({
      title: '提示',
      content: '确定要关闭吗？',
      onConfirm: () => {
        done()
      },
    })
  }
  else {
    done()
  }
}
</script>

<template>
  <FaButton @click="modal = true">
    打开
  </FaButton>
  <FaModal v-model="modal" title="标题" description="这里是一段描述介绍" :maximizable="modalInfo.maximizable" :closable="modalInfo.closable" :draggable="modalInfo.draggable" :align-center="modalInfo.alignCenter" :center="modalInfo.center" :loading="modalInfo.loading" :header="modalInfo.header" :footer="modalInfo.footer" :before-close="handleBeforeClose" :class="modalInfo.class">
    <div :class="modalInfo.contentHeight">
      <div class="flex-start-center flex-wrap gap-2">
        <FaButton :variant="modalInfo.maximizable ? 'default' : 'outline'" class="w-full" @click="modalInfo.maximizable = !modalInfo.maximizable">
          最大化按钮
        </FaButton>
        <FaButton :variant="modalInfo.closable ? 'default' : 'outline'" class="w-full" @click="modalInfo.closable = !modalInfo.closable">
          关闭按钮
        </FaButton>
        <FaButton :variant="modalInfo.draggable ? 'default' : 'outline'" class="w-full" @click="modalInfo.draggable = !modalInfo.draggable">
          拖拽
        </FaButton>
        <FaButton :variant="modalInfo.alignCenter ? 'default' : 'outline'" class="w-full" @click="modalInfo.alignCenter = !modalInfo.alignCenter">
          窗口居中
        </FaButton>
        <FaButton :variant="modalInfo.center ? 'default' : 'outline'" class="w-full" @click="modalInfo.center = !modalInfo.center">
          居中显示
        </FaButton>
        <FaButton :variant="modalInfo.header ? 'default' : 'outline'" class="w-full" @click="modalInfo.header = !modalInfo.header">
          头部区域
        </FaButton>
        <FaButton :variant="modalInfo.footer ? 'default' : 'outline'" class="w-full" @click="modalInfo.footer = !modalInfo.footer">
          尾部区域
        </FaButton>
        <FaButton :variant="!!modalInfo.contentHeight ? 'default' : 'outline'" class="w-full" @click="modalInfo.contentHeight = !!modalInfo.contentHeight ? '' : 'h-400'">
          切换内容高度
        </FaButton>
        <FaButton variant="outline" class="w-full" @click="modalInfo.loading = true">
          显示加载中
        </FaButton>
        <FaButton :variant="!!modalInfo.class ? 'default' : 'outline'" class="w-full" @click="modalInfo.class = !!modalInfo.class ? '' : 'sm:max-w-2xl'">
          调整最大宽度
        </FaButton>
      </div>
    </div>
  </FaModal>
</template>
