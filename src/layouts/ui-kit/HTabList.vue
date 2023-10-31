<script setup lang="ts" generic="T">
import { Tab, TabGroup, TabList } from '@headlessui/vue'

const props = defineProps<{
  modelValue: T
  options: {
    label: any
    value: T
  }[]
}>()

const emits = defineEmits<{
  'update:modelValue': [T]
  'change': [T]
}>()

const selectedIndex = computed({
  get() {
    return props.options.findIndex(option => option.value === props.modelValue)
  },
  set(val) {
    emits('update:modelValue', props.options[val].value)
  },
})

watch(() => props.modelValue, (val) => {
  emits('change', val)
})

function handleChange(index: number) {
  emits('update:modelValue', props.options[index].value)
}
</script>

<template>
  <TabGroup :selected-index="selectedIndex" @change="handleChange">
    <TabList class="inline-flex items-center justify-center p-1 rounded-md bg-stone-1 dark:bg-stone-9 ring-1 ring-stone-2 dark:ring-stone-8 select-none">
      <Tab v-for="(option, index) in options" :key="index" v-slot="{ selected }" as="template">
        <button
          class="inline-flex items-center justify-center w-full px-2 py-1.5 border-size-0 text-sm rounded-md truncate text-dark dark:text-white bg-inherit focus:outline-none ring-inset ring-stone-2 dark:ring-stone-8 focus:ring-2" :class="{
            'cursor-default bg-white dark:bg-dark-9': selected,
            'cursor-pointer opacity-50 transition hover:(opacity-100)': !selected,
          }"
        >
          {{ option.label }}
        </button>
      </Tab>
    </TabList>
  </TabGroup>
</template>
