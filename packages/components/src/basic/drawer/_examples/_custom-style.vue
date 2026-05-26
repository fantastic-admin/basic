<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaDrawer from '../index.vue'

const open = shallowRef(false)
</script>

<template>
  <FaButton @click="open = true">
    打开抽屉
  </FaButton>
  <FaDrawer
    v-model="open"
    title="自定义样式"
    description="通过 contentClass、headerClass 和 footerClass 调整抽屉区域样式。"
    content-class="sm:max-w-xl border-primary/30"
    header-class="bg-primary/8"
    footer-class="bg-muted/50"
    show-cancel-button
  >
    <div class="text-sm leading-6 p-4 rounded-lg bg-muted/50">
      可以根据业务场景调整宽度、背景、边框和底部区域样式。
    </div>
  </FaDrawer>
</template>
