<script setup lang="ts">
const popperValue = ref('2')
const itemAlignedValue = ref('2')

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
</script>

<template>
  <div class="space-y-2">
    <FaSelect
      v-model="popperValue"
      :options="options"
      position="popper"
    />
    <FaSelect
      v-model="itemAlignedValue"
      :options="options"
      position="item-aligned"
    />
  </div>
</template>
