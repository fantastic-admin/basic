<script setup lang="ts">
defineOptions({
  name: 'PageMain',
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

const titleSlot = !!useSlots().title

const isCollaspe = ref(props.collaspe)
function unCollaspe() {
  isCollaspe.value = false
}
</script>

<template>
  <div
    class="page-main flex flex-col relative m-4 bg-[var(--g-container-bg)] transition-background-color-300" :class="{
      'of-hidden': isCollaspe,
    }" :style="{
      height: isCollaspe ? height : '',
    }"
  >
    <div v-if="titleSlot || title" class="title-container px-5 py-4 border-b-1 border-b-solid border-b-[var(--g-bg)] transition-border-color-300">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="main-container p-5">
      <slot />
    </div>
    <div v-if="isCollaspe" class="collaspe absolute bottom-0 w-full pt-10 pb-2 text-center cursor-pointer bg-gradient-to-b from-transparent to-[var(--g-container-bg)]" @click="unCollaspe">
      <SvgIcon name="ep:arrow-down" class="text-xl op-30 hover:op-100 transition-opacity" />
    </div>
  </div>
</template>
