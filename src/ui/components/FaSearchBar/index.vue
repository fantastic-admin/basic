<script setup lang="ts">
defineOptions({
  name: 'FaSearchBar',
})

withDefaults(
  defineProps<{
    showToggle?: boolean
    background?: boolean
  }>(),
  {
    showToggle: true,
    background: false,
  },
)

const emits = defineEmits<{
  toggle: [value: boolean]
}>()

const fold = defineModel<boolean>('fold', {
  default: true,
})

function toggle() {
  fold.value = !fold.value
  emits('toggle', fold.value)
}
</script>

<template>
  <div
    class="relative" :class="{
      'py-4': showToggle,
      'px-4 bg-secondary transition': background,
    }"
  >
    <slot :fold="fold" :toggle="toggle" />
    <div v-if="showToggle" class="absolute bottom-0 left-0 w-full translate-y-1/2 text-center">
      <button class="h-5 inline-flex cursor-pointer select-none items-center border-size-0 rounded bg-secondary px-2 text-xs font-medium outline-none" @click="toggle">
        <FaIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top' " />
      </button>
    </div>
  </div>
</template>
