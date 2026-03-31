<script setup lang="ts">
const select = ref('1')
</script>

<template>
  <FaSelect
    v-model="select"
    :options="[
      {
        label: 'Group 1',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
      },
      {
        label: 'Group 2',
        options: [
          { label: 'Option 3', value: '3' },
          { label: 'Option 4', value: '4' },
        ],
      },
    ]"
  />
</template>
