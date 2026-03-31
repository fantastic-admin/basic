<script setup lang="ts">
defineOptions({
  name: 'FaPasswordStrength',
})

const props = withDefaults(
  defineProps<{
    password?: string
  }>(),
  {
    password: '',
  },
)

const maxStrength = 5

const hasLength = computed(() => props.password.length >= 8)
const hasUppercase = computed(() => /[A-Z]/.test(props.password))
const hasLowercase = computed(() => /[a-z]/.test(props.password))
const hasNumber = computed(() => /\d/.test(props.password))
const hasSpecialChar = computed(() => /[^A-Z0-9]/i.test(props.password))

const strength = computed(() => {
  let score = 0
  if (hasLength.value) {
    score++
  }
  if (hasUppercase.value) {
    score++
  }
  if (hasLowercase.value) {
    score++
  }
  if (hasNumber.value) {
    score++
  }
  if (hasSpecialChar.value) {
    score++
  }
  return score
})

const strengthColor = computed(() => {
  if (strength.value === 0) {
    return 'bg-red-500'
  }
  if (strength.value < 3) {
    return 'bg-orange-500'
  }
  if (strength.value < 5) {
    return 'bg-yellow-500'
  }
  return 'bg-green-500'
})
</script>

<template>
  <div class="flex-center gap-2 w-full">
    <div class="rounded-full bg-border flex-1 h-2 overflow-hidden">
      <div
        :class="strengthColor"
        :style="{ width: `${(strength / maxStrength) * 100}%` }"
        class="h-full transition-all duration-300 ease-out"
      />
    </div>
    <FaTooltip>
      <FaIcon name="i-ri:question-line" class="text-sm text-muted-foreground cursor-help" />
      <template #content>
        <div class="py-1">
          <div class="text-sm text-muted-foreground mb-1">
            建议
          </div>
          <ul class="text-sm text-muted-foreground space-y-1">
            <li class="flex-center-start gap-1" :class="{ 'text-green-600': hasLength }">
              <FaIcon :name="hasLength ? 'i-carbon:checkmark' : 'i-carbon:close'" />
              长度至少为8个字符
            </li>
            <li class="flex-center-start gap-1" :class="{ 'text-green-600': hasUppercase }">
              <FaIcon :name="hasUppercase ? 'i-carbon:checkmark' : 'i-carbon:close'" />
              包含大写字母
            </li>
            <li class="flex-center-start gap-1" :class="{ 'text-green-600': hasLowercase }">
              <FaIcon :name="hasLowercase ? 'i-carbon:checkmark' : 'i-carbon:close'" />
              包含小写字母
            </li>
            <li class="flex-center-start gap-1" :class="{ 'text-green-600': hasNumber }">
              <FaIcon :name="hasNumber ? 'i-carbon:checkmark' : 'i-carbon:close'" />
              包含数字
            </li>
            <li class="flex-center-start gap-1" :class="{ 'text-green-600': hasSpecialChar }">
              <FaIcon :name="hasSpecialChar ? 'i-carbon:checkmark' : 'i-carbon:close'" />
              包含特殊字符
            </li>
          </ul>
        </div>
      </template>
    </FaTooltip>
  </div>
</template>
