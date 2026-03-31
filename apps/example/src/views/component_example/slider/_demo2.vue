<script setup lang="ts">
const value = ref<number[]>([0])
</script>

<template>
  <FaSlider v-model="value" orientation="vertical" class="data-[orientation=vertical]:h-100" />
</template>
