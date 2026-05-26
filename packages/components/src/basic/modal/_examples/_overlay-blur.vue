<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaModal from '../index.vue'

const overlayOpen = shallowRef(false)
const blurOpen = shallowRef(false)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaButton @click="overlayOpen = true">
      无遮罩
    </FaButton>
    <FaButton variant="outline" @click="blurOpen = true">
      模糊遮罩
    </FaButton>
  </div>

  <FaModal v-model="overlayOpen" title="无遮罩弹窗" :overlay="false">
    <div class="text-sm text-muted-foreground">
      设置 overlay 为 false 后，不显示背景遮罩。
    </div>
  </FaModal>
  <FaModal v-model="blurOpen" title="模糊遮罩" overlay-blur>
    <div class="text-sm text-muted-foreground">
      设置 overlay-blur 后，背景遮罩会带有模糊效果。
    </div>
  </FaModal>
</template>
