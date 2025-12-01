<script setup lang="ts">
import LeftSide from './leftSide.vue'
import RightSide from './rightSide.vue'

defineOptions({
  name: 'Toolbar',
})
</script>

<template>
  <div class="toolbar-container h-[var(--g-toolbar-height)] flex items-center justify-between bg-[var(--g-toolbar-bg)]">
    <div class="left-side h-full flex items-center of-hidden pe-16 ps-2">
      <LeftSide />
    </div>
    <div class="h-full flex flex-shrink-0 items-center justify-end px-2">
      <RightSide />
    </div>
  </div>
</template>

<style scoped>
.left-side {
  mask-image: linear-gradient(to right, #000 0%, #000 calc(100% - 50px), transparent);
}
</style>
