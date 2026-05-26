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
    title="成员信息"
    description="用于补充说明当前抽屉的内容和操作上下文。"
  >
    <div class="text-sm text-muted-foreground leading-6">
      标题和描述会显示在默认头部区域中。
    </div>
  </FaDrawer>
</template>
