<script setup lang="ts">
const input = ref('')

function handleComplete() {
  useFaToast().info(input.value)
}
</script>

<template>
  <FaInputOTP v-model="input" @complete="handleComplete" />
</template>
