<script setup lang="ts">
import { cn } from '@/utils'

defineOptions({
  name: 'FaButtonGroup',
})

const props = defineProps<{
  vertical?: boolean
}>()
</script>

<template>
  <div
    :class="cn('inline-flex gap-[1px] items-stretch', {
      'horizontal-group flex-row': !props.vertical,
      'vertical-group flex-col': props.vertical,
    })"
  >
    <slot />
  </div>
</template>

<style scoped>
.horizontal-group {
  :deep(> button) {
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:first-child, :last-child) {
      border-radius: 0;
    }
  }
}

.vertical-group {
  :deep(> button) {
    &:first-child {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:last-child {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &:not(:first-child, :last-child) {
      border-radius: 0;
    }
  }
}
</style>
