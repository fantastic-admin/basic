<script setup lang="ts">
const height = ref([50])
</script>

<template>
  <FaFixedBar position="bottom">
    <div :style="`height: ${height[0]}px;`" />
    <FaSlider v-model="height" />
  </FaFixedBar>
</template>
