<script setup lang="ts">
const value = ref(0)
</script>

<template>
  <FaNumberField v-model="value" :min="0" :max="10" :step="0.1" />
</template>
