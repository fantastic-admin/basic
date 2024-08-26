<template>
  <div class="flex items-center text-sm">
    <slot />
  </div>
</template>

<style scoped>
:deep(.breadcrumb-item) {
  &:first-child {
    .separator {
      display: none;
    }
  }

  &:last-child {
    .text {
      opacity: 1;
    }
  }
}
</style>
