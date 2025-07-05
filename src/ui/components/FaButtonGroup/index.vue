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
    &:first-child:not(:last-child) {
      border-start-end-radius: 0;
      border-end-end-radius: 0;
    }

    &:last-child:not(:first-child) {
      border-start-start-radius: 0;
      border-end-start-radius: 0;
    }

    &:not(:first-child, :last-child) {
      border-radius: 0;
    }
  }
}

.vertical-group {
  :deep(> button) {
    &:first-child:not(:last-child) {
      border-end-start-radius: 0;
      border-end-end-radius: 0;
    }

    &:last-child:not(:first-child) {
      border-start-start-radius: 0;
      border-start-end-radius: 0;
    }

    &:not(:first-child, :last-child) {
      border-radius: 0;
    }
  }
}
</style>
