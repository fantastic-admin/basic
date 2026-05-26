<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaModal from '../index.vue'

const open = shallowRef(false)
</script>

<template>
  <FaButton @click="open = true">
    打开弹窗
  </FaButton>
  <FaModal
    v-model="open"
    title="自定义样式"
    class="sm:max-w-2xl"
    header-class="bg-muted/40"
    content-class="min-h-auto"
    footer-class="bg-muted/40"
    show-cancel-button
  >
    <div class="text-sm text-muted-foreground">
      可以通过 class、header-class、content-class 和 footer-class 调整弹窗样式。
    </div>
  </FaModal>
</template>
