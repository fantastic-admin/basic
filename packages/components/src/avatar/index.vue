<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

defineOptions({
  name: 'FaAvatar',
})

const props = defineProps<{
  src: string
  fallback?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Avatar :class="props.class">
    <AvatarImage :src="src" />
    <AvatarFallback class="inline-flex">
      <slot>
        {{ fallback?.slice(0, 2) }}
      </slot>
    </AvatarFallback>
  </Avatar>
</template>
