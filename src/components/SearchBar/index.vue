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
    <div v-if="showToggle" class="absolute left-0 bottom-0 w-full text-center translate-y-1/2">
      <button class="outline-none cursor-pointer inline-flex items-center px-2 h-5 border-size-0 font-medium text-xs rounded select-none bg-[var(--g-bg)]" @click="toggle">
        <SvgIcon :name="isFold ? 'ep:caret-bottom' : 'ep:caret-top' " />
      </button>
    </div>
  </div>
</template>
