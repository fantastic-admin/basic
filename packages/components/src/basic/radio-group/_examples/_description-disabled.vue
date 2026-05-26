<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { computed, ref } from 'vue'
import FaRadioGroup from '../index.vue'

const value = ref('growth')

const options = [
  {
    label: '创业版',
    value: 'starter',
    description: '适合 1-10 人小团队，保留核心能力。',
  },
  {
    label: '成长版',
    value: 'growth',
    description: '适合多角色协作，支持审批与审计流程。',
  },
  {
    label: '企业版',
    value: 'enterprise',
    description: '高级安全策略与 SSO 即将开放。',
    disabled: true,
  },
]

const currentLabel = computed(() =>
  options.find(option => option.value === value.value)?.label ?? '',
)
</script>

<template>
  <div class="gap-4 grid">
    <FaRadioGroup v-model="value" :options="options" />
    <div class="text-sm text-muted-foreground">
      已选套餐：{{ currentLabel }}
    </div>
  </div>
</template>
