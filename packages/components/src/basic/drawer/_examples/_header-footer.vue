<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaDrawer from '../index.vue'

const hiddenHeaderOpen = shallowRef(false)
const hiddenFooterOpen = shallowRef(false)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaButton @click="hiddenHeaderOpen = true">
      隐藏头部
    </FaButton>
    <FaButton variant="outline" @click="hiddenFooterOpen = true">
      隐藏底部
    </FaButton>
  </div>

  <FaDrawer v-model="hiddenHeaderOpen" :header="false">
    <div class="text-sm text-muted-foreground">
      当前抽屉隐藏了头部区域。
    </div>
  </FaDrawer>
  <FaDrawer v-model="hiddenFooterOpen" title="隐藏底部" :footer="false">
    <div class="text-sm text-muted-foreground">
      当前抽屉隐藏了底部操作区。
    </div>
  </FaDrawer>
</template>
