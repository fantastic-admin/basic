<script setup lang="ts" generic="T extends string | number">
import type { HTMLAttributes } from 'vue'
import { omit } from 'es-toolkit'
import { cn } from '../../utils'
import { InputGroup, InputGroupAddon } from './input-group'
import { Textarea } from './textarea'

defineOptions({
  name: 'FaTextarea',
})

const props = withDefaults(defineProps<{
  align?: 'inline' | 'block'
  class?: HTMLAttributes['class']
  inputClass?: HTMLAttributes['class']
  startClass?: HTMLAttributes['class']
  endClass?: HTMLAttributes['class']
}>(), {
  align: 'inline',
})

const slots = defineSlots<{
  start?: () => VNode
  end?: () => VNode
}>()

const value = defineModel<T>()
</script>

<template>
  <InputGroup :class="props.class">
    <Textarea
      v-model="value"
      v-bind="{
        ...omit(props, ['align', 'class', 'inputClass', 'startClass', 'endClass']),
        class: cn('flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 focus-visible:ring-transparent ring-offset-transparent dark:bg-transparent', props.inputClass),
        ...$attrs,
      }"
      data-slot="input-group-control"
    />
    <InputGroupAddon v-if="slots.start" :align="props.align === 'inline' ? 'inline-start' : 'block-start'" :class="cn('empty:hidden', props.startClass)">
      <slot name="start" />
    </InputGroupAddon>
    <InputGroupAddon v-if="slots.end" :align="props.align === 'inline' ? 'inline-end' : 'block-end'" :class="cn('empty:hidden', props.endClass)">
      <slot name="end" />
    </InputGroupAddon>
  </InputGroup>
</template>
