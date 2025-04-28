<script setup lang="ts">
import LeftSide from './leftSide.vue'
import RightSide from './rightSide.vue'

defineOptions({
  name: 'Toolbar',
})
</script>

<template>
  <div class="toolbar-container flex items-center justify-between">
    <div class="left-side h-full flex items-center of-hidden pe-16 ps-2">
      <LeftSide />
    </div>
    <div class="h-full flex flex-shrink-0 items-center justify-end px-2">
      <RightSide />
    </div>
  </div>
</template>

<style scoped>
.toolbar-container {
  height: var(--g-toolbar-height);
  background-color: var(--g-toolbar-bg);
  transition: background-color 0.3s;

  .left-side {
    mask-image: linear-gradient(to right, #000 0%, #000 calc(100% - 50px), transparent);
  }
}
</style>
