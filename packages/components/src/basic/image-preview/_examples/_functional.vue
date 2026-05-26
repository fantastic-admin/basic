<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import { useImagePreview } from '../index'

const { open } = useImagePreview()

function openSingle() {
  open('https://fantastic-admin.hurui.me/logo.svg')
}

function openMulti() {
  open([
    'https://fantastic-admin.hurui.me/logo.svg',
    'https://fantastic-mobile.hurui.me/logo.png',
  ])
}

function openMultiWithIndex() {
  open([
    'https://fantastic-admin.hurui.me/logo.svg',
    'https://fantastic-mobile.hurui.me/logo.png',
  ], 1)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaButton @click="openSingle">
      预览单张
    </FaButton>
    <FaButton @click="openMulti">
      预览多张
    </FaButton>
    <FaButton @click="openMultiWithIndex">
      预览多张（初始预览第2张）
    </FaButton>
  </div>
</template>
