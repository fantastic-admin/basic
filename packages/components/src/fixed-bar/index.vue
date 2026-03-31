<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../utils'

defineOptions({
  name: 'FaFixedBar',
})

const props = defineProps<{
  position: 'top' | 'bottom'
  class?: HTMLAttributes['class']
}>()

const isActive = ref(false)
onMounted(() => {
  isActive.value = true
})
onActivated(() => {
  isActive.value = true
})
onDeactivated(() => {
  isActive.value = false
})
</script>

<template>
  <Teleport :to="`#${props.position === 'top' ? 'fixed-content-before-area' : 'fixed-content-after-area'}`" defer :disabled="!isActive">
    <div :class="cn('mx-auto bg-background pointer-events-auto p-4', props.class)">
      <slot />
    </div>
  </Teleport>
</template>
