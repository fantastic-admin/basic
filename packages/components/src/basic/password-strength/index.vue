<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../icon/index.vue'
import Tooltip from '../tooltip/index.vue'

defineOptions({
  name: 'BuiltInPasswordStrength',
})

const props = withDefaults(
  defineProps<{
    password?: string
    rules?: PasswordStrengthRule[]
    colorThresholds?: PasswordStrengthColorThreshold[]
  }>(),
  {
    password: '',
    rules: () => [
      { label: '长度至少为8个字符', rule: value => value.length >= 8 },
      { label: '包含大写字母', rule: value => /[A-Z]/.test(value) },
      { label: '包含小写字母', rule: value => /[a-z]/.test(value) },
      { label: '包含数字', rule: value => /\d/.test(value) },
      { label: '包含特殊字符', rule: value => /[^A-Z0-9]/i.test(value) },
    ],
    colorThresholds: () => [
      { min: 0, color: 'bg-red-500' },
      { min: 1, color: 'bg-orange-500' },
      { min: 3, color: 'bg-yellow-500' },
      { min: 5, color: 'bg-green-500' },
    ],
  },
)

interface PasswordStrengthRule {
  label: string
  rule: (value: string) => boolean
}

interface PasswordStrengthColorThreshold {
  min: number
  color: string
}

const ruleStates = computed(() => props.rules.map(item => ({
  label: item.label,
  matched: item.rule(props.password),
})))

const maxStrength = computed(() => props.rules.length)
const strength = computed(() => ruleStates.value.filter(item => item.matched).length)

const progressWidth = computed(() => maxStrength.value > 0 ? `${(strength.value / maxStrength.value) * 100}%` : '0%')

const strengthColor = computed(() => {
  return [...props.colorThresholds]
    .sort((a, b) => b.min - a.min)
    .find(item => strength.value >= item.min)
    ?.color
})
</script>

<template>
  <div class="flex-center gap-2 w-full">
    <div class="rounded-full bg-border flex-1 h-2 overflow-hidden">
      <div
        :class="strengthColor"
        :style="{ width: progressWidth }"
        class="h-full transition-all duration-300 ease-out"
      />
    </div>
    <Tooltip>
      <Icon name="i-ri:question-line" class="text-sm text-muted-foreground cursor-help" />
      <template #content>
        <div class="py-1">
          <ul class="text-sm text-muted-foreground space-y-1">
            <li
              v-for="item in ruleStates"
              :key="item.label"
              class="flex-center-start gap-1"
              :class="{ 'text-green-600': item.matched }"
            >
              <Icon :name="item.matched ? 'i-carbon:checkmark' : 'i-carbon:close'" />
              {{ item.label }}
            </li>
          </ul>
        </div>
      </template>
    </Tooltip>
  </div>
</template>
