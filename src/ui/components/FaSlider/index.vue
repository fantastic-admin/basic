<script setup lang="ts">
import type { SliderRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Slider } from './slider'

defineOptions({
  name: 'FaSlider',
})

const props = withDefaults(defineProps<{
  defaultValue?: SliderRootProps['defaultValue']
  disabled?: SliderRootProps['disabled']
  inverted?: SliderRootProps['inverted']
  max?: SliderRootProps['max']
  min?: SliderRootProps['min']
  step?: SliderRootProps['step']
  orientation?: SliderRootProps['orientation']
  thumbAlignment?: SliderRootProps['thumbAlignment']
  class?: HTMLAttributes['class']
}>(), {
  defaultValue: () => [0],
  disabled: false,
  inverted: false,
  max: 100,
  min: 0,
  step: 1,
  orientation: 'horizontal',
  thumbAlignment: 'contain',
})

const modelValue = defineModel<number[]>()
</script>

<template>
  <Slider v-bind="props" v-model="modelValue" />
</template>
