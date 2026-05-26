<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaDrawer from '../index.vue'

const noOverlayOpen = shallowRef(false)
const blurOverlayOpen = shallowRef(false)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaButton @click="noOverlayOpen = true">
      无遮罩
    </FaButton>
    <FaButton variant="outline" @click="blurOverlayOpen = true">
      模糊遮罩
    </FaButton>
  </div>

  <FaDrawer v-model="noOverlayOpen" title="无遮罩" :overlay="false">
    打开时不显示背景遮罩。
  </FaDrawer>
  <FaDrawer v-model="blurOverlayOpen" title="模糊遮罩" overlay-blur>
    打开时背景遮罩带模糊效果。
  </FaDrawer>
</template>
