<script setup lang="ts">
import { reactive } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaDrawer from '../index.vue'

const drawers = reactive({
  top: false,
  bottom: false,
  left: false,
  right: false,
})
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaButton @click="drawers.top = true">
      上方
    </FaButton>
    <FaButton @click="drawers.bottom = true">
      下方
    </FaButton>
    <FaButton @click="drawers.left = true">
      左侧
    </FaButton>
    <FaButton @click="drawers.right = true">
      右侧
    </FaButton>
  </div>

  <FaDrawer v-model="drawers.top" side="top" title="上方抽屉">
    从页面顶部弹出。
  </FaDrawer>
  <FaDrawer v-model="drawers.bottom" side="bottom" title="下方抽屉">
    从页面底部弹出。
  </FaDrawer>
  <FaDrawer v-model="drawers.left" side="left" title="左侧抽屉">
    从页面左侧弹出。
  </FaDrawer>
  <FaDrawer v-model="drawers.right" side="right" title="右侧抽屉">
    从页面右侧弹出。
  </FaDrawer>
</template>
