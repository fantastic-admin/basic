<script setup lang="ts">
import { useSlots } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'

defineOptions({
  name: 'BuiltInCollapsible',
})

const open = defineModel<boolean>('modelValue', {
  default: false,
})

const slots = useSlots()
</script>

<template>
  <Collapsible v-model:open="open">
    <CollapsibleTrigger v-if="!!slots.trigger">
      <slot name="trigger" :open />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
