<script setup lang="ts">
defineOptions({
  name: 'SearchBar',
})

const props = withDefaults(
  defineProps<{
    fold?: boolean
    showToggle?: boolean
    background?: boolean
  }>(),
  {
    fold: true,
    showToggle: true,
    background: false,
  },
)

const emits = defineEmits<{
  'update:fold': [
    value: boolean,
  ]
  'toggle': [
    value: boolean,
  ]
}>()

const isFold = ref(props.fold)

watch(() => props.fold, (value) => {
  isFold.value = value
  emits('update:fold', value)
})

function toggle() {
  isFold.value = !isFold.value
  emits('toggle', isFold.value)
}
</script>

<template>
  <div
    class="relative" :class="{
      'py-4': showToggle,
      'px-4 bg-[var(--g-bg)] transition': background,
    }"
  >
    <slot :fold="isFold" />
    <div v-if="showToggle" class="absolute bottom-0 left-0 w-full translate-y-1/2 text-center">
      <button class="h-5 inline-flex cursor-pointer select-none items-center border-size-0 rounded bg-[var(--g-bg)] px-2 text-xs font-medium outline-none" @click="toggle">
        <SvgIcon :name="isFold ? 'ep:caret-bottom' : 'ep:caret-top' " />
      </button>
    </div>
  </div>
</template>
