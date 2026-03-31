<script setup lang="ts" generic="T extends string | number">
import type { HTMLAttributes } from 'vue'
import { omit } from 'es-toolkit'
import { cn } from '../../utils'
import { Input } from './input'
import { InputGroup, InputGroupAddon } from './input-group'

defineOptions({
  name: 'FaInput',
})

const props = withDefaults(defineProps<{
  type?: 'text' | 'password'
  align?: 'inline' | 'block'
  disabled?: boolean
  clearable?: boolean
  class?: HTMLAttributes['class']
  inputClass?: HTMLAttributes['class']
  startClass?: HTMLAttributes['class']
  endClass?: HTMLAttributes['class']
}>(), {
  type: 'text',
  align: 'inline',
})

const emits = defineEmits<{
  clear: []
}>()

const slots = defineSlots<{
  start?: () => VNode
  end?: () => VNode
}>()

const value = defineModel<T>()

const type = ref(props.type)

const inputRef = useTemplateRef('inputRef')

const isFocused = ref(false)
const isHovered = ref(false)

function handleClear() {
  value.value = undefined
  emits('clear')
}

defineExpose({
  ref: computed(() => inputRef.value?.ref),
})
</script>

<template>
  <InputGroup :class="cn('w-[200px]', props.class)" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <Input
      v-bind="{
        ...omit(props, ['type', 'align', 'clearable', 'class', 'inputClass', 'startClass', 'endClass']),
        type,
        class: cn('w-full flex-1 border-0 rounded-none bg-transparent ring-offset-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:ring-transparent', props.inputClass),
        ...$attrs,
      }"
      ref="inputRef"
      v-model="value"
      data-slot="input-group-control"
      autocomplete="off"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <InputGroupAddon v-if="slots.start" :align="props.align === 'inline' ? 'inline-start' : 'block-start'" :class="cn('empty:hidden', props.startClass)">
      <slot name="start" />
    </InputGroupAddon>
    <InputGroupAddon v-if="slots.end || props.clearable || props.type === 'password'" :align="props.align === 'inline' ? 'inline-end' : 'block-end'" :class="cn('empty:hidden', props.endClass)">
      <FaButton v-if="!props.disabled && props.clearable && !!value && (isFocused || isHovered)" variant="ghost" size="icon" type="button" class="size-6" @click="handleClear">
        <FaIcon name="i-lucide:x" />
      </FaButton>
      <FaButton v-if="props.type === 'password' && !!value" variant="ghost" size="icon" type="button" class="size-6" @click="type = type === 'password' ? 'text' : 'password'">
        <FaIcon :name="type === 'password' ? 'i-lucide:eye-off' : 'i-lucide:eye'" />
      </FaButton>
      <slot name="end" />
    </InputGroupAddon>
  </InputGroup>
</template>

<style scoped>
input[type="password"]::-ms-reveal {
  display: none;
}
</style>
