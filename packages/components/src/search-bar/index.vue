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
    <div v-if="showToggle" class="text-center w-full translate-y-1/2 bottom-0 left-0 absolute">
      <button class="text-xs font-medium px-2 outline-none border-size-0 rounded bg-secondary inline-flex h-5 cursor-pointer select-none items-center" @click="toggle">
        <FaIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top' " />
      </button>
    </div>
  </div>
</template>
