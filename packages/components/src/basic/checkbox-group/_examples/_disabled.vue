<script setup lang="ts">
import { computed, shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaCheckboxGroup from '../index.vue'

const value = shallowRef(['basic'])

const options = [
  { label: '基础能力', value: 'basic' },
  { label: '审批流', value: 'approval' },
  { label: '审计日志', value: 'audit', disabled: true },
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
    <div class="text-sm text-muted-foreground">
      当前值：{{ currentText || '未选择' }}
    </div>
  </div>
</template>
