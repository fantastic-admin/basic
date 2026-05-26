<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaModal from '../index.vue'

const open = shallowRef(false)
</script>

<template>
  <FaButton @click="open = true">
    打开弹窗
  </FaButton>
  <FaModal v-model="open" title="弹窗标题">
    <div class="text-sm text-muted-foreground">
      这里是弹窗内容区域。
    </div>
  </FaModal>
</template>
