<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TagVariants } from './tag'
import { Tag } from './tag'

defineOptions({
  name: 'BuiltInTag',
})

const props = defineProps<{
  variant?: TagVariants['variant']
  class?: HTMLAttributes['class']
  icon?: string
  closable?: boolean
}>()

const emit = defineEmits<{
  close: [event: MouseEvent]
}>()

function handleClose(event: MouseEvent) {
  emit('close', event)
}
</script>

<template>
  <Tag :variant :icon :closable :class="props.class" @close="handleClose">
    <slot />
  </Tag>
</template>
