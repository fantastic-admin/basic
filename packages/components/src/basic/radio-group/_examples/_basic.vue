<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaRadioGroup from '../index.vue'

const value = ref('comfortable')

const options = [
  { label: '默认', value: 'default' },
  { label: '舒适', value: 'comfortable' },
  { label: '紧凑', value: 'compact' },
]
</script>

<template>
  <div class="gap-4 grid">
    <FaRadioGroup v-model="value" :options="options" />
    <FaRadioGroup v-model="value" :options="options" class="flex" />
    <div class="text-sm text-muted-foreground">
      当前值：{{ value }}
    </div>
  </div>
</template>
