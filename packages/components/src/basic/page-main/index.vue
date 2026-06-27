<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { ref } from 'vue'
import { cn } from '#utils'
import Button from '../button/index.vue'
import Icon from '../icon/index.vue'

defineOptions({
  name: 'BuiltInPageMain',
})

const props = withDefaults(
  defineProps<{
    title?: string
    collaspe?: boolean
    height?: string
    class?: HTMLAttributes['class']
    titleClass?: HTMLAttributes['class']
    mainClass?: HTMLAttributes['class']
  }>(),
  {
    title: '',
    collaspe: false,
    height: '',
  },
)

const slots = defineSlots<{
  title?: () => VNode
  default?: () => VNode
}>()

const isCollaspe = ref(props.collaspe)
function handleCollaspe() {
  isCollaspe.value = !isCollaspe.value
}
</script>

<template>
  <div
    :class="cn('m-4 flex flex-col overflow-hidden rounded-lg border bg-card transition-[background-color,border-color]', {
      'overflow-hidden': collaspe,
    }, props.class)"
  >
    <div v-if="!!slots.title || title" :class="cn('px-4 py-4 my--2 bg-muted text-muted-foreground rounded-t-lg text-sm', props.titleClass)">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div
      :class="cn('group/pagemain relative h-[calc-size(auto,size)] bg-inherit p-4 rounded-lg transition-height', {
        'border-t': !!slots.title || title,
        'overflow-hidden': collaspe,
        'mask-b-from-12': isCollaspe,
      }, props.mainClass)" :style="{
        height: isCollaspe ? height : '',
      }"
    >
      <slot />
      <Button v-if="collaspe" variant="link" size="icon" class="opacity-0 transition-all inset-b-0 inset-s-1/2 absolute group-hover/pagemain:opacity-100 -translate-x-1/2" :class="{ 'rotate-x-180': !isCollaspe }" @click="handleCollaspe">
        <Icon name="i-material-symbols:arrow-drop-down-rounded" class="text-xl" />
      </Button>
    </div>
  </div>
</template>
