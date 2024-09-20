<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
    enable?: boolean
  }>(),
  {
    text: '',
    enable: true,
  },
)
</script>

<template>
  <VTooltip v-if="enable" :popper-triggers="['hover']" v-bind="$attrs">
    <slot />
    <template #popper>
      <slot name="text">
        {{ text }}
      </slot>
    </template>
  </VTooltip>
  <div v-else>
    <slot />
  </div>
</template>
