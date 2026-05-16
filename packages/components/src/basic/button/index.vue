<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from './button'
import Icon from '../icon/index.vue'
import { Button } from './button'

defineOptions({
  name: 'BuiltInButton',
})

const props = defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  loading?: boolean
}>()
</script>

<template>
  <Button :variant :size :disabled="props.disabled || props.loading" :class="props.class">
    <Icon v-if="loading" name="i-line-md:loading-twotone-loop" />
    <slot />
  </Button>
</template>
