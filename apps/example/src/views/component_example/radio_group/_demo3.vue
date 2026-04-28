<script setup lang="ts">
const value = ref('balanced')

const options = [
  {
    label: '专注模式',
    value: 'focus',
    description: '突出主任务，弱化辅助信息，适合录入和审批场景。',
  },
  {
    label: '平衡模式',
    value: 'balanced',
    description: '信息密度与可读性保持平衡，适合作为默认配置。',
  },
  {
    label: '高密度模式',
    value: 'dense',
    description: '在大屏中同时承载更多信息，适合运营与监控看板。',
  },
]

const currentLabel = computed(() =>
  options.find(option => option.value === value.value)?.label ?? '',
)
</script>

<template>
  <div class="gap-4 grid">
    <FaRadioGroup
      v-model="value"
      orientation="horizontal"
      :options="options"
      class="gap-4 md:grid-cols-3"
      option-class="rounded-xl border border-transparent px-1 py-1"
      item-class="mt-1"
    >
      <template #option="{ option, checked, disabled }">
        <div
          class="px-4 py-3 border rounded-xl flex gap-3 w-full transition-colors items-start justify-between" :class="[
            checked ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40',
            disabled && 'opacity-60',
          ]"
        >
          <div class="gap-1 grid min-w-0">
            <div class="text-sm font-medium truncate">
              {{ option.label }}
            </div>
            <div
              v-if="option.description"
              class="text-xs text-muted-foreground leading-5"
            >
              {{ option.description }}
            </div>
          </div>
          <span
            class="text-xs font-medium shrink-0" :class="[
              checked ? 'text-primary' : 'text-muted-foreground',
            ]"
          >
            {{ checked ? '已选中' : '可选择' }}
          </span>
        </div>
      </template>
    </FaRadioGroup>
    <div class="text-sm text-muted-foreground">
      当前模式：{{ currentLabel }}
    </div>
  </div>
</template>
