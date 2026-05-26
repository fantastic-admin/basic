<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaPagination from '../index.vue'

const page = ref(1)
const size = ref(10)
const total = ref(100)
const message = ref('等待分页操作')

function handlePageChange(value: number) {
  message.value = `当前页码切换为：${value}`
}

function handleSizeChange(value: number) {
  message.value = `每页条数切换为：${value}`
}
</script>

<template>
  <div class="space-y-3">
    <FaPagination
      v-model:page="page"
      v-model:size="size"
      :total="total"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    />
    <div class="text-sm text-muted-foreground">
      {{ message }}
    </div>
  </div>
</template>
