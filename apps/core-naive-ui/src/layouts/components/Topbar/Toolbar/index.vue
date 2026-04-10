<script setup lang="ts">
import EndSide from './endSide.vue'
import StartSide from './startSide.vue'

defineOptions({
  name: 'Toolbar',
})
</script>

<template>
  <div class="bg-[var(--g-toolbar-bg)] flex h-[var(--g-toolbar-height)] items-center justify-between">
    <div class="start-side pe-16 ps-2 flex h-full items-center of-hidden">
      <StartSide />
    </div>
    <div class="px-2 flex flex-shrink-0 h-full items-center justify-end">
      <EndSide />
    </div>
  </div>
</template>

<style scoped>
.start-side {
  mask-image: linear-gradient(to right, #000 0%, #000 calc(100% - 50px), transparent);
}
</style>
