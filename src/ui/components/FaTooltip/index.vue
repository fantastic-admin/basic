<script setup lang="ts">
import type { TooltipContentProps, TooltipProviderProps } from 'reka-ui'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

defineOptions({
  name: 'FaTooltip',
})

withDefaults(
  defineProps<{
    text?: string
    delay?: TooltipProviderProps['delayDuration']
    side?: TooltipContentProps['side']
    align?: TooltipContentProps['align']
    disabled?: boolean
  }>(),
  {
    text: '',
    delay: 300,
  },
)
</script>

<template>
  <TooltipProvider :delay-duration="delay" :disabled>
    <Tooltip>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent :side :align class="z-10000 text-xs">
        <slot name="content">
          <p>{{ text }}</p>
        </slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
