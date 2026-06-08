<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TagVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '#utils'
import { tagVariants } from '.'
import Icon from '../../icon/index.vue'

interface Props extends PrimitiveProps {
  variant?: TagVariants['variant']
  icon?: string
  closable?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'span',
})

const emit = defineEmits<{
  close: [event: MouseEvent]
}>()

function handleClose(event: MouseEvent) {
  emit('close', event)
}
</script>

<template>
  <Primitive
    data-slot="tag"
    :as="as"
    :as-child="asChild"
    :class="cn(tagVariants({ variant }), props.class)"
  >
    <Icon v-if="icon" :name="icon" class="size-3" />
    <slot />
    <button
      v-if="closable"
      type="button"
      class="me--1 outline-none rounded-full inline-flex ring-offset-background items-center justify-center focus:ring-2 focus:ring-ring focus:ring-offset-2"
      @click="handleClose"
    >
      <Icon name="i-lucide:x" class="size-3" />
    </button>
  </Primitive>
</template>
