<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

defineOptions({
  name: 'FaTabs',
})

const props = defineProps<{
  modelValue?: string | number
  list: {
    icon?: string
    label: string
    value: string | number
    class?: HTMLAttributes['class']
  }[]
  class?: HTMLAttributes['class']
  listClass?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  'update:modelValue': [string | number]
}>()

const activeTab = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  activeTab.value = newValue
})

function handleChange(value: string | number) {
  activeTab.value = value
  emits('update:modelValue', value)
}
</script>

<template>
  <Tabs v-model="activeTab" :class="cn('flex flex-col', props.class)" @update:model-value="handleChange">
    <TabsList :class="cn('flex items-center justify-center', props.listClass)">
      <TabsTrigger v-for="item in list" :key="item.value" :value="item.value" :class="cn('w-full', item.class)">
        <div class="flex-center gap-1">
          <FaIcon v-if="item.icon" :name="item.icon" class="flex-shrink-0" />
          {{ item.label }}
        </div>
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="item in list" :key="item.value" :value="item.value" :class="props.contentClass">
      <slot :name="item.value" />
    </TabsContent>
  </Tabs>
</template>
