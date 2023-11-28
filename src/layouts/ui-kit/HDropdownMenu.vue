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
  <VMenu :delay="200" v-bind="$attrs">
    <slot />
    <template #popper>
      <div v-for="(item, index) in myItems" :key="index" class="p-1" border-b="~ solid stone-2 dark:stone-7 last:size-0">
        <button v-for="(v, i) in item" :key="i" :disabled="v.disabled" class="w-full flex cursor-pointer items-center gap-2 border-size-0 rounded-md bg-inherit px-2 py-1.5 text-sm text-dark disabled:cursor-not-allowed dark:text-white disabled:opacity-50 hover:not-disabled:bg-stone-1 dark:hover:not-disabled:bg-stone-9" @click="v.handle">
          {{ v.label }}
        </button>
      </div>
    </template>
  </VMenu>
</template>
