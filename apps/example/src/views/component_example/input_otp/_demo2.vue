<script setup lang="ts">
const input = ref('')
</script>

<template>
  <FaInputOTP v-model="input" :length="4" />
</template>
