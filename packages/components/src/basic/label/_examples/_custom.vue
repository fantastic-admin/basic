<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { shallowRef } from 'vue'
import FaCheckbox from '../../checkbox/index.vue'
import FaIcon from '../../icon/index.vue'
import FaInput from '../../input/index.vue'
import FaLabel from '../index.vue'

const keyword = shallowRef('')
const remember = shallowRef(false)
</script>

<template>
  <div class="space-y-4">
    <FaLabel>
      <div class="text-muted-foreground flex shrink-0 gap-2 w-24 items-center">
        <FaIcon name="i-lucide:search" />
        <span>关键词</span>
      </div>
      <FaInput v-model="keyword" placeholder="请输入关键词" class="w-72" />
    </FaLabel>
    <FaLabel>
      <FaCheckbox v-model="remember" />
      <span>记住当前筛选条件</span>
    </FaLabel>
  </div>
</template>
