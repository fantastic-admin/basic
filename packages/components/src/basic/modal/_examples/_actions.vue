<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaModal from '../index.vue'

const closableOpen = shallowRef(false)
const maximizableOpen = shallowRef(false)
const draggableOpen = shallowRef(false)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <FaButton @click="closableOpen = true">
      隐藏关闭按钮
    </FaButton>
    <FaButton variant="outline" @click="maximizableOpen = true">
      最大化
    </FaButton>
    <FaButton variant="secondary" @click="draggableOpen = true">
      拖拽
    </FaButton>
  </div>

  <FaModal v-model="closableOpen" title="隐藏关闭按钮" :closable="false" show-cancel-button>
    <div class="text-sm text-muted-foreground">
      右上角关闭按钮已隐藏，可以通过底部按钮关闭。
    </div>
  </FaModal>
  <FaModal v-model="maximizableOpen" title="可最大化弹窗" maximizable>
    <div class="text-sm text-muted-foreground">
      点击右上角最大化按钮可以切换弹窗尺寸。
    </div>
  </FaModal>
  <FaModal v-model="draggableOpen" title="可拖拽弹窗" draggable>
    <div class="text-sm text-muted-foreground">
      按住标题栏可以拖动弹窗位置。
    </div>
  </FaModal>
</template>
