<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaDrawer from '../index.vue'

const closableOpen = shallowRef(false)
const notClosableOpen = shallowRef(false)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaButton @click="closableOpen = true">
      显示关闭按钮
    </FaButton>
    <FaButton variant="outline" @click="notClosableOpen = true">
      隐藏关闭按钮
    </FaButton>
  </div>

  <FaDrawer v-model="closableOpen" title="显示关闭按钮" closable>
    右上角会显示关闭按钮。
  </FaDrawer>
  <FaDrawer v-model="notClosableOpen" title="隐藏关闭按钮" :closable="false">
    右上角不会显示关闭按钮，可通过底部按钮关闭。
  </FaDrawer>
</template>
