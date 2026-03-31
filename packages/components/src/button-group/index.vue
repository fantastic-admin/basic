<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonGroupVariants } from './button-group'
import { ButtonGroup, ButtonGroupSeparator } from './button-group'

defineOptions({
  name: 'FaButtonGroup',
})

const props = defineProps<{
  orientation?: ButtonGroupVariants['orientation']
  separator?: boolean
  class?: HTMLAttributes['class']
}>()

const slots = useSlots()

const buttonItems = ref<any>([])

onMounted(() => {
  // 主动捕获默认槽位中提供的所有内容
  watchEffect(() => {
    buttonItems.value = slots.default ? slots.default() : []
  })
})
</script>

<template>
  <ButtonGroup :orientation :class="props.class">
    <template v-for="(item, index) in buttonItems" :key="index">
      <component :is="item" />
      <ButtonGroupSeparator v-if="props.separator && index !== buttonItems.length - 1" :orientation="props.orientation === 'vertical' ? 'horizontal' : 'vertical'" />
    </template>
  </ButtonGroup>
</template>
