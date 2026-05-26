<script setup lang="ts">
import { computed, shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaCheckboxGroup from '../index.vue'

const value = shallowRef(['music'])

const options = [
  { label: '阅读', value: 'reading' },
  { label: '音乐', value: 'music' },
  { label: '运动', value: 'sports' },
]

const currentText = computed(() =>
  options
    .filter(option => value.value.includes(option.value))
    .map(option => option.label)
    .join('、'),
)
</script>

<template>
  <div class="gap-4 grid">
    <FaCheckboxGroup v-model="value" :options="options" />
    <FaCheckboxGroup v-model="value" :options="options" class="flex" />
    <div class="text-sm text-muted-foreground">
      当前值：{{ currentText || '未选择' }}
    </div>
  </div>
</template>
