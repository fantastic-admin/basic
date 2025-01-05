<script setup lang="ts">
defineOptions({
  name: 'FaPageHeader',
})

defineProps<{
  title?: string
  description?: string
}>()

const slots = defineSlots<{
  title?: () => VNode
  description?: () => VNode
  default?: () => VNode
}>()
</script>

<template>
  <div class="page-header mb-4 flex flex-wrap items-center justify-between gap-5 border-b bg-background px-5 py-4 transition-[background-color,border-color]">
    <div class="main flex-[1_1_70%]">
      <div class="text-2xl">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="mt-2 text-sm text-secondary-foreground/50 empty-hidden">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
    <div v-if="!!slots.default" class="ml-a flex-none">
      <slot />
    </div>
  </div>
</template>
