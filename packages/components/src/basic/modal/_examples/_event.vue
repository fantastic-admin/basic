<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import { useToast } from '../../toast'
import FaModal from '../index.vue'

const open = shallowRef(false)
const toast = useToast()

function handleBeforeClose(action: 'confirm' | 'cancel' | 'close', done: () => void) {
  toast(`beforeClose: ${action}`)
  window.setTimeout(done, 600)
}
</script>

<template>
  <FaButton @click="open = true">
    打开弹窗
  </FaButton>
  <FaModal
    v-model="open"
    title="触发事件"
    show-cancel-button
    :before-close="handleBeforeClose"
    @open="toast('open')"
    @opened="toast('opened')"
    @close="toast('close')"
    @closed="toast('closed')"
    @confirm="toast('confirm')"
    @cancel="toast('cancel')"
  >
    <div class="text-sm text-muted-foreground">
      打开、关闭、确认、取消和动画完成等事件都会触发 toast。
    </div>
  </FaModal>
</template>
