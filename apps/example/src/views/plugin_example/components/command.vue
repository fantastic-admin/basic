<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  text: string
}>()

const { copy, copied, isSupported } = useClipboard()
</script>

<template>
  <FaKbd class="me-1 cursor-pointer pointer-events-auto" @click="isSupported && copy(props.text)">
    <FaIcon :name="copied ? 'i-lucide:check' : 'i-lucide:copy'" class="size-3" />
    {{ text }}
  </FaKbd>
</template>
