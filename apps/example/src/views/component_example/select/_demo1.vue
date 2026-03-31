<script setup lang="ts">
const select = ref('1')
</script>

<template>
  <FaSelect
    v-model="select"
    :options="[
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true },
      { label: 'Option 3', value: '3' },
    ]"
  />
</template>
