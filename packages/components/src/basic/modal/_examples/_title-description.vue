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
  <FaModal v-model="open" title="账号安全验证" description="继续操作前，请确认当前操作由本人发起。">
    <div class="text-sm text-muted-foreground">
      描述会显示在标题下方，用于补充说明弹窗目的。
    </div>
  </FaModal>
</template>
