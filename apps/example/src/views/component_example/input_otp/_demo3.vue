<script setup lang="ts">
const input = ref('')

function handleComplete() {
  faToast.info(input.value)
}
</script>

<template>
  <FaInputOTP v-model="input" @complete="handleComplete" />
</template>
