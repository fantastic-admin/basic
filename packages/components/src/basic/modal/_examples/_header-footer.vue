<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaModal from '../index.vue'

const headerOpen = shallowRef(false)
const footerOpen = shallowRef(false)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaButton @click="headerOpen = true">
      隐藏头部
    </FaButton>
    <FaButton variant="outline" @click="footerOpen = true">
      隐藏底部
    </FaButton>
  </div>

  <FaModal v-model="headerOpen" :header="false">
    <div class="text-sm text-muted-foreground">
      当前弹窗隐藏了头部区域。
    </div>
  </FaModal>
  <FaModal v-model="footerOpen" title="隐藏底部" :footer="false">
    <div class="text-sm text-muted-foreground">
      当前弹窗隐藏了底部操作区域。
    </div>
  </FaModal>
</template>
