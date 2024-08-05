<script setup lang="ts" generic="T">
import { Tab, TabGroup, TabList } from '@headlessui/vue'

const props = defineProps<{
  options: {
    icon?: string
    label: any
    value: T
  }[]
}>()

const emits = defineEmits<{
  change: [T]
}>()

const value = defineModel<T>()

const selectedIndex = computed({
  get() {
    return props.options.findIndex(option => option.value === value.value)
  },
  set(val) {
    value.value = props.options[val].value
  },
})

watch(value, (val) => {
  val && emits('change', val)
})

function handleChange(index: number) {
  value.value = props.options[index].value
}
</script>

<template>
  <TabGroup :selected-index="selectedIndex" @change="handleChange">
    <TabList class="inline-flex select-none items-center justify-center rounded-md bg-stone-1 p-1 ring-1 ring-stone-2 dark-bg-stone-9 dark-ring-stone-8">
      <Tab v-for="(option, index) in options" :key="index" v-slot="{ selected }" as="template">
        <button
          class="w-full inline-flex items-center justify-center gap-1 whitespace-nowrap border-size-0 rounded-md bg-inherit px-2 py-1.5 text-sm text-dark ring-stone-2 ring-inset dark-text-white focus-outline-none focus-ring-2 dark-ring-stone-8" :class="{
            'cursor-default bg-white dark-bg-dark-9': selected,
            'cursor-pointer opacity-50 hover-(opacity-100)': !selected,
          }"
        >
          <SvgIcon v-if="option.icon" :name="option.icon" class="flex-shrink-0" />
          {{ option.label }}
        </button>
      </Tab>
    </TabList>
  </TabGroup>
</template>
