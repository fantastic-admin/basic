<script setup lang="ts">
defineOptions({
  name: 'PageHeader',
})

defineProps<{
  title?: string
  content?: string
}>()

const slots = useSlots()
</script>

<template>
  <div class="page-header mb-5 flex flex-wrap items-center justify-between gap-5 bg-[var(--g-container-bg)] px-5 py-4 transition-background-color-300">
    <div class="main flex-[1_1_70%]">
      <div class="text-2xl">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="mt-2 text-sm text-stone-5 empty-hidden">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </div>
    <div v-if="slots.default" class="ml-a flex-none">
      <slot />
    </div>
  </div>
</template>
