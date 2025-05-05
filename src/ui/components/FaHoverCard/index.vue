<script setup lang="ts">
import type { HoverCardContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './hover-card'

defineOptions({
  name: 'FaHoverCard',
})

const props = defineProps<{
  align?: HoverCardContentProps['align']
  alignOffset?: HoverCardContentProps['alignOffset']
  side?: HoverCardContentProps['side']
  sideOffset?: HoverCardContentProps['sideOffset']
  collisionPadding?: HoverCardContentProps['collisionPadding']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <slot />
    </HoverCardTrigger>
    <HoverCardContent :align :align-offset :side :side-offset :collision-padding :class="props.class">
      <slot name="card" />
    </HoverCardContent>
  </HoverCard>
</template>
