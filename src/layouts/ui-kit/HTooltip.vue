<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string
  }>(),
  {
    text: '',
  },
)
</script>

<template>
  <VTooltip :popper-triggers="['hover']" v-bind="$attrs">
    <slot />
    <template #popper>
      <slot name="text">
        {{ text }}
      </slot>
    </template>
  </VTooltip>
</template>
