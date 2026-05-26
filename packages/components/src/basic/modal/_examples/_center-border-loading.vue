<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaModal from '../index.vue'

const centeredOpen = shallowRef(false)
const borderlessOpen = shallowRef(false)
const loadingOpen = shallowRef(false)
const loading = shallowRef(false)

function openLoadingModal() {
  loadingOpen.value = true
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 1800)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaButton @click="centeredOpen = true">
      居中
    </FaButton>
    <FaButton variant="outline" @click="borderlessOpen = true">
      无边框
    </FaButton>
    <FaButton variant="secondary" @click="openLoadingModal">
      载入
    </FaButton>
  </div>

  <FaModal v-model="centeredOpen" title="居中弹窗" center align-center show-cancel-button>
    <div class="text-sm text-muted-foreground text-center">
      标题、描述和底部按钮会居中显示，弹窗也会垂直居中。
    </div>
  </FaModal>
  <FaModal v-model="borderlessOpen" title="无边框弹窗" :border="false" show-cancel-button>
    <div class="text-sm text-muted-foreground">
      头部和底部不显示分割线。
    </div>
  </FaModal>
  <FaModal v-model="loadingOpen" title="载入状态" :loading="loading">
    <div class="text-sm text-muted-foreground">
      弹窗主体区域会显示载入遮罩。
    </div>
  </FaModal>
</template>
