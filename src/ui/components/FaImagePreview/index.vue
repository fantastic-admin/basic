<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import Preview from './preview.vue'

defineOptions({
  name: 'FaImagePreview',
})

const props = defineProps<{
  src: string
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  load: []
  error: []
}>()

const isLoading = ref(true)
const isError = ref(false)
const isOpen = ref(false)

function handleLoad() {
  isLoading.value = false
  emits('load')
}

function handleError() {
  isError.value = true
  isLoading.value = false
  emits('error')
}

function handleClick() {
  if (!isError.value) {
    isOpen.value = true
  }
}
</script>

<template>
  <div class="group/image-preview relative inline-block overflow-hidden border rounded-lg">
    <img
      :src="src"
      :class="cn('size-50 object-contain cursor-pointer bg-background transition-all duration-300 group-hover/image-preview:scale-110', props.class, {
        invisible: isError || isLoading,
      })"
      @error="handleError"
      @load="handleLoad"
      @click="!isLoading && !isError && handleClick()"
    >
    <div v-if="isLoading" class="absolute left-0 top-0 h-full w-full flex-center">
      <slot name="loading">
        <FaIcon name="i-line-md:loading-twotone-loop" class="size-8 text-secondary-foreground/50" />
      </slot>
    </div>
    <div v-if="isError" class="absolute left-0 top-0 h-full w-full flex-center">
      <slot name="error">
        <FaIcon name="i-ph:image-broken-duotone" class="size-8 text-secondary-foreground/50" />
      </slot>
    </div>
    <Preview v-model="isOpen" :src />
  </div>
</template>
