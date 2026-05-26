<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { shallowRef } from 'vue'
import FaButton from '../../button/index.vue'
import FaIcon from '../index.vue'

const imageUrl = shallowRef('https://picsum.photos/80')

function changeImage() {
  imageUrl.value = `https://picsum.photos/80?random=${Math.random()}`
}

function showError() {
  imageUrl.value = 'https://xxx/'
}

const logo = new URL('./logo.svg', import.meta.url).href
</script>

<template>
  <div class="flex flex-wrap gap-6 items-end">
    <div class="p-4 border rounded-lg flex flex-col gap-3 items-center">
      <span class="text-xs text-muted-foreground font-medium">网络图片</span>
      <FaIcon :name="imageUrl" class="size-14" />
      <div class="flex gap-2">
        <FaButton size="sm" @click="changeImage">
          更换图片
        </FaButton>
        <FaButton size="sm" variant="outline" @click="showError">
          触发错误
        </FaButton>
      </div>
    </div>
    <div class="p-4 border rounded-lg flex flex-col gap-3 items-center">
      <span class="text-xs text-muted-foreground font-medium">相对路径</span>
      <FaIcon :name="logo" class="size-14" />
    </div>
  </div>
</template>
