<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaTag from '../index.vue'

const tags = ref([
  { id: 1, label: '标签一', variant: 'default' as const },
  { id: 2, label: '标签二', variant: 'destructive' as const },
  { id: 3, label: '标签三', variant: 'outline' as const },
  { id: 4, label: '标签四', variant: 'secondary' as const },
])

function handleClose(id: number) {
  tags.value = tags.value.filter(tag => tag.id !== id)
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaTag
      v-for="tag in tags"
      :key="tag.id"
      :variant="tag.variant"
      closable
      @close="handleClose(tag.id)"
    >
      {{ tag.label }}
    </FaTag>
  </div>
</template>
