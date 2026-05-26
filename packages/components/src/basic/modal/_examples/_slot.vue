<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import FaModal from '../index.vue'

const open = shallowRef(false)
</script>

<template>
  <FaButton @click="open = true">
    打开弹窗
  </FaButton>
  <FaModal v-model="open">
    <template #header>
      <div class="pr-8 flex gap-3 items-start">
        <FaIcon name="i-lucide:message-square-warning" class="text-primary mt-0.5 size-5" />
        <div>
          <div class="font-semibold">
            自定义头部
          </div>
          <div class="text-sm text-muted-foreground">
            使用 header 插槽替换默认标题。
          </div>
        </div>
      </div>
    </template>

    <div class="text-sm text-muted-foreground">
      这里是默认插槽内容。
    </div>

    <template #footer>
      <div class="flex gap-2 w-full justify-end">
        <FaButton variant="outline" @click="open = false">
          取消
        </FaButton>
        <FaButton @click="open = false">
          保存
        </FaButton>
      </div>
    </template>
  </FaModal>
</template>
