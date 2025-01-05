<script setup lang="ts">
defineOptions({
  name: 'FaKbd',
})
</script>

<template>
  <kbd class="h-6 inline-flex select-none items-center gap-1 border rounded-md bg-muted px-1.5 text-sm text-muted-foreground font-medium font-sans">
    <slot />
  </kbd>
</template>
