<script setup lang="ts">
import { useSlots } from '@/slots'
import Tools from './tools.vue'

defineOptions({
  name: 'ToolbarRightSide',
})
</script>

<template>
  <div class="flex items-center">
    <Tools mode="right-side" />
    <Component :is="useSlots('toolbar-end')" />
  </div>
</template>
