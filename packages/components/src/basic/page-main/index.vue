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
    :class="cn('m-4 flex flex-col overflow-hidden rounded-lg border transition-[background-color,border-color]', {
      'overflow-hidden': collaspe,
    }, props.class)"
  >
    <div v-if="!!slots.title || title" :class="cn('px-4 py-4 my--2 bg-muted text-muted-foreground rounded-t-lg text-sm', props.titleClass)">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div
      :class="cn('group/pagemain relative h-[calc-size(auto,size)] bg-card p-4 rounded-lg transition-height after:(pointer-events-none absolute bottom-0 left-0 z-1 h-12 max-h-full w-full from-transparent to-[oklch(var(--card))] bg-gradient-to-b opacity-0 transition-opacity content-empty)', {
        'border-t': !!slots.title || title,
        'overflow-hidden': collaspe,
        'after:(opacity-100)': isCollaspe,
      }, props.mainClass)" :style="{
        height: isCollaspe ? height : '',
      }"
    >
      <slot />
      <Button v-if="collaspe" variant="link" size="icon" class="opacity-0 transition-all inset-b-0 inset-s-1/2 absolute group-hover/pagemain:opacity-100 -translate-x-1/2" :class="{ 'rotate-x-180': !isCollaspe }" @click="handleCollaspe">
        <Icon name="i-ep:arrow-down" class="text-xl" />
      </Button>
    </div>
  </div>
</template>
