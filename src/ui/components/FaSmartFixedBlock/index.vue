<script setup lang="ts">
defineOptions({
  name: 'FaSmartFixedBlock',
})

defineProps<{
  position: 'top' | 'bottom'
}>()
</script>

<template>
  <div class="smart-fixed-block" :class="{ [`${position}`]: position }">
    <slot />
  </div>
</template>

<style scoped>
.smart-fixed-block {
  position: fixed;
  inset-inline: 50% 0;
  z-index: 1000;
  width: calc(100% - var(--g-main-sidebar-actual-width) - var(--g-sub-sidebar-actual-width));
  transition: width 0.3s, max-width 0.3s, transform 0.3s;
  transform: translateX(-50%) translateX(calc(var(--g-main-sidebar-actual-width) / 2)) translateX(calc(var(--g-sub-sidebar-actual-width) / 2));

  &.top {
    top: var(--g-header-actual-height);
  }

  &.bottom {
    bottom: 0;
  }

  [data-app-width-mode="center"] & {
    max-width: calc(var(--g-app-width) - var(--g-main-sidebar-actual-width) - var(--g-sub-sidebar-actual-width));
  }

  [data-app-width-mode="center-max-width"] & {
    max-width: calc(var(--g-app-width) - var(--g-main-sidebar-actual-width) - var(--g-sub-sidebar-actual-width));
  }

  [dir="rtl"] & {
    transform: translateX(50%) translateX(calc(var(--g-main-sidebar-actual-width) / 2 * -1)) translateX(calc(var(--g-sub-sidebar-actual-width) / 2 * -1));
  }

  [data-mode="mobile"] & {
    width: 100% !important;
    transform: translateX(-50%) !important;

    [dir="rtl"] & {
      transform: translateX(50%) !important;
    }
  }
}
</style>
