<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import { useToast } from '../../toast'
import FaDrawer from '../index.vue'

const open = shallowRef(false)
const toast = useToast()

function notify(eventName: string) {
  toast(`触发事件：${eventName}`)
}
</script>

<template>
  <FaButton @click="open = true">
    打开抽屉
  </FaButton>
  <FaDrawer
    v-model="open"
    title="触发事件"
    show-cancel-button
    @open="notify('open')"
    @opened="notify('opened')"
    @close="notify('close')"
    @closed="notify('closed')"
    @confirm="notify('confirm')"
    @cancel="notify('cancel')"
  >
    <div class="text-sm text-muted-foreground">
      打开、关闭、确认和取消时会触发对应事件。
    </div>
  </FaDrawer>
</template>
