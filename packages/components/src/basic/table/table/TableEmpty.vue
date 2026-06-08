<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '#utils'
import TableCell from './TableCell.vue'
import TableRow from './TableRow.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  colspan?: number
}>(), {
  colspan: 1,
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <TableRow class="h-full">
    <TableCell
      :class="
        cn(
          'h-full p-4 whitespace-nowrap align-middle text-sm text-foreground',
          props.class,
        )
      "
      v-bind="delegatedProps"
    >
      <div class="flex h-full min-h-40 items-center justify-center">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>
