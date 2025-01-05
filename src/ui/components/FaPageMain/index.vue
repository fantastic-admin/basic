<script setup lang="ts">
defineOptions({
  name: 'FaPageMain',
})

const props = withDefaults(
  defineProps<{
    title?: string
    collaspe?: boolean
    height?: string
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
  <div class="page-main m-4 flex flex-col border rounded-lg bg-card transition-[background-color,border-color]" :class="{ 'overflow-hidden': collaspe }">
    <div v-if="!!slots.title || title" class="title-container border-b px-5 py-4 transition-border-color">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div
      class="main-container group relative h-[calc-size(auto,size)] p-5 transition-height after:(pointer-events-none absolute bottom-0 left-0 z-1 h-12 max-h-full w-full from-transparent to-[hsl(var(--card))] bg-gradient-to-b opacity-0 transition-opacity content-empty)" :class="{
        'overflow-hidden': collaspe,
        'after:(opacity-100)': isCollaspe,
      }" :style="{
        height: isCollaspe ? height : '',
      }"
    >
      <slot />
      <FaButton v-if="collaspe" variant="link" size="icon" class="absolute inset-b-0 inset-s-1/2 opacity-0 transition-all -translate-x-1/2 group-hover-opacity-100" :class="{ 'rotate-x-180': !isCollaspe }" @click="handleCollaspe">
        <FaIcon name="i-ep:arrow-down" class="text-xl" />
      </FaButton>
    </div>
  </div>
</template>
