<script setup lang="ts">
const value = ref<number[]>([0])
</script>

<template>
  <FaSlider v-model="value" />
</template>
