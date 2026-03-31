<script setup lang="ts">
const switchVal = ref(false)
</script>

<template>
  <div class="flex gap-4">
    <FaSwitch v-model="switchVal" />
    <FaSwitch v-model="switchVal" on-icon="ri:sun-line" off-icon="ri:moon-line" />
  </div>
</template>
