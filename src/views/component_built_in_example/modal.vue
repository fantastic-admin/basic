<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useFaModal } from '@/ui/components/FaModal'

const modal = ref(false)
const modalInfo = ref({
  maximizable: false,
  closable: true,
  draggable: false,
  center: false,
  header: true,
  footer: true,
  contentHeight: '',
  loading: false,
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

function showModalInfo() {
  useFaModal().info({
    title: '温馨提醒',
    content: '这是 info 弹窗',
    onConfirm: () => {
      toast.info('你点了确定')
    },
  })
}
function showModalSuccess() {
  useFaModal().success({
    title: '温馨提醒',
    content: '这是 success 弹窗',
    onConfirm: () => {
      toast.success('你点了确定')
    },
  })
}
function showModalWarning() {
  useFaModal().warning({
    title: '温馨提醒',
    content: '这是 warning 弹窗',
    onConfirm: () => {
      toast.warning('你点了确定')
    },
  })
}
function showModalError() {
  useFaModal().error({
    title: '温馨提醒',
    content: '这是 confirm 弹窗',
    onConfirm: () => {
      toast.error('你点了确定')
    },
  })
}
function showModalConfirm() {
  useFaModal().confirm({
    title: '温馨提醒',
    content: '这是 confirm 弹窗',
    onConfirm: () => {
      toast.success('你点了确定')
    },
  })
}

function showModalPromiseConfirm() {
  useFaModal().confirm({
    title: '温馨提醒',
    content: '这是 confirm 弹窗',
    confirmButtonText: '确认（随机成功或失败）',
    beforeClose: async (action, done) => {
      if (action === 'confirm') {
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (Math.random() > 0.5) {
          toast.success('成功了！')
          done()
        }
        else {
          toast.error('失败了！')
        }
      }
      else {
        done()
      }
    },
  })
}
</script>

<template>
  <div>
    <FaPageHeader title="弹窗" description="FaModal" />
    <FaPageMain>
      <div class="flex gap-4">
        <FaButton @click="modal = true">
          打开
        </FaButton>
        <FaButton @click="showModalInfo">
          Info
        </FaButton>
        <FaButton @click="showModalSuccess">
          Success
        </FaButton>
        <FaButton @click="showModalWarning">
          Warning
        </FaButton>
        <FaButton @click="showModalError">
          Error
        </FaButton>
        <FaButton @click="showModalConfirm">
          Confirm
        </FaButton>
        <FaButton @click="showModalPromiseConfirm">
          Confirm with promise
        </FaButton>
      </div>
      <FaModal v-model="modal" title="标题" description="这里是一段描述介绍" :maximizable="modalInfo.maximizable" :closable="modalInfo.closable" :draggable="modalInfo.draggable" :center="modalInfo.center" :loading="modalInfo.loading" :header="modalInfo.header" :footer="modalInfo.footer" :before-close="handleBeforeClose">
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
          </div>
        </div>
      </FaModal>
    </FaPageMain>
  </div>
</template>
