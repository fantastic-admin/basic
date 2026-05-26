<script setup lang="ts">
import { computed, shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaCheckboxGroup from '../index.vue'

const value = shallowRef(['dashboard', 'report'])

const options = [
  {
    label: '看板订阅',
    value: 'dashboard',
    description: '每天 8:00 推送核心经营指标。',
  },
  {
    label: '周报摘要',
    value: 'report',
    description: '每周一汇总关键数据变化。',
  },
  {
    label: '系统告警',
    value: 'alarm',
    description: '异常波动时立即通知处理人。',
  },
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
