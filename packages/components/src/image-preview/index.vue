<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../utils'
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

// 监听 src 变化，重置加载状态
watch(() => props.src, () => {
  isLoading.value = true
  isError.value = false
}, { immediate: false })

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
  <div class="group/image-preview border rounded-lg inline-block relative overflow-hidden">
    <img
      :src="src"
      :class="cn('size-50 object-contain cursor-pointer transition-all duration-300 group-hover/image-preview:scale-110', props.class, {
        invisible: isError || isLoading,
      })"
      @error="handleError"
      @load="handleLoad"
      @click="!isLoading && !isError && handleClick()"
    >
    <div v-if="isLoading" class="flex-center h-full w-full left-0 top-0 absolute">
      <slot name="loading">
        <FaIcon name="i-line-md:loading-twotone-loop" class="text-secondary-foreground/50 size-8" />
      </slot>
    </div>
    <div v-if="isError" class="flex-center h-full w-full left-0 top-0 absolute">
      <slot name="error">
        <FaIcon name="i-ph:image-broken-duotone" class="text-secondary-foreground/50 size-8" />
      </slot>
    </div>
    <Preview v-model="isOpen" :src />
  </div>
</template>
