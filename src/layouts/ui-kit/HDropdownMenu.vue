<script setup lang="ts">
const props = defineProps<{
  items: {
    label: string
    disabled?: boolean
    hide?: boolean
    handle?: () => void
  }[][]
}>()

const myItems = computed(() => {
  return props.items.map((item) => {
    return item.filter(v => !v.hide)
  }).filter(v => v.length)
})
</script>

<template>
  <VMenu :show-triggers="['hover']" :auto-hide="false" :popper-triggers="['hover', 'click']" :delay="200" v-bind="$attrs">
    <slot />
    <template #popper>
      <div v-for="(item, index) in myItems" :key="index" class="b-b-(stone-2 solid) p-1 last-b-b-size-0 dark-b-b-(stone-7)">
        <button v-for="(v, i) in item" :key="i" :disabled="v.disabled" class="w-full flex cursor-pointer items-center gap-2 border-size-0 rounded-md bg-inherit px-2 py-1.5 text-sm text-dark disabled-cursor-not-allowed dark-text-white disabled-opacity-50 hover-not-disabled-bg-stone-1 dark-hover-not-disabled-bg-stone-9" @click="v.handle">
          {{ v.label }}
        </button>
      </div>
    </template>
  </VMenu>
</template>
