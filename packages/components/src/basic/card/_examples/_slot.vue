<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import FaCard from '../index.vue'
</script>

<template>
  <FaCard class="w-96">
    <template #header>
      <div class="flex gap-4 items-center justify-between">
        <div>
          <div class="text-base font-semibold">
            自定义头部
          </div>
          <div class="text-sm text-muted-foreground">
            header slot 会覆盖 title 和 description
          </div>
        </div>
        <FaIcon name="i-lucide:badge-check" class="text-primary size-5" />
      </div>
    </template>

    卡片内容区域

    <template #footer>
      <div class="flex gap-2 w-full justify-end">
        <FaButton variant="outline">
          取消
        </FaButton>
        <FaButton>
          确定
        </FaButton>
      </div>
    </template>
  </FaCard>
</template>
