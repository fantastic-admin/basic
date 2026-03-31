<script setup lang="ts">
const height = ref([50])
</script>

<template>
  <FaFixedBar position="top">
    <FaSlider v-model="height" />
    <div :style="`height: ${height[0]}px;`" />
  </FaFixedBar>
</template>
