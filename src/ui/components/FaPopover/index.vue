<script setup lang="ts">
import type { PopoverContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover'

defineOptions({
  name: 'FaPopover',
})

const props = defineProps<{
  align?: PopoverContentProps['align']
  alignOffset?: PopoverContentProps['alignOffset']
  side?: PopoverContentProps['side']
  sideOffset?: PopoverContentProps['sideOffset']
  collisionPadding?: PopoverContentProps['collisionPadding']
  class?: HTMLAttributes['class']
}>()

function handleOpenAutoFocus(e: Event) {
  e.preventDefault()
}

const open = defineModel<boolean>('open', {
  default: false,
})
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>
    <PopoverContent :align :align-offset :side :side-offset :collision-padding :class="props.class" @open-auto-focus="handleOpenAutoFocus">
      <slot name="panel" />
    </PopoverContent>
  </Popover>
</template>
