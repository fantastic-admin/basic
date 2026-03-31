<script setup lang="ts">
function showModalInfo() {
  useFaModal().info({
    title: '温馨提醒',
    content: '这是 info 弹窗',
    onConfirm: () => {
      faToast.info('你点了确定')
    },
  })
}
function showModalSuccess() {
  useFaModal().success({
    title: '温馨提醒',
    content: '这是 success 弹窗',
    onConfirm: () => {
      faToast.info('你点了确定')
    },
  })
}
function showModalWarning() {
  useFaModal().warning({
    title: '温馨提醒',
    content: '这是 warning 弹窗',
    onConfirm: () => {
      faToast.info('你点了确定')
    },
  })
}
function showModalError() {
  useFaModal().error({
    title: '温馨提醒',
    content: '这是 confirm 弹窗',
    onConfirm: () => {
      faToast.info('你点了确定')
    },
  })
}
function showModalConfirm() {
  useFaModal().confirm({
    title: '温馨提醒',
    content: '这是 confirm 弹窗',
    onConfirm: () => {
      faToast.info('你点了确定')
    },
  })
}
function showModalDoubleConfirm() {
  const { update } = useFaModal().confirm({
    title: '温馨提醒',
    content: '这是 confirm 弹窗',
    beforeClose: (action, done) => {
      if (action === 'confirm') {
        update({
          title: '二次确认',
          content: '确定要关闭吗？',
          confirmButtonText: '我确定',
          cancelButtonText: '我取消',
          beforeClose: (action) => {
            if (action === 'confirm') {
              done()
            }
            else {
              done()
            }
          },
        })
      }
      else {
        done()
      }
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
          faToast.success('成功了！')
          done()
        }
        else {
          faToast.error('失败了！')
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
  <div class="flex gap-4">
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
    <FaButton @click="showModalDoubleConfirm">
      Double Confirm
    </FaButton>
    <FaButton @click="showModalPromiseConfirm">
      Confirm with promise
    </FaButton>
  </div>
</template>
