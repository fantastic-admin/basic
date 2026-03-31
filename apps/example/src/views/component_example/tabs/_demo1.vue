<script setup lang="ts">
const tabs = ref(1)
</script>

<template>
  <FaTabs v-model="tabs" :list="[{ label: '标签1', value: 1 }, { label: '标签2', value: 2 }, { label: '标签3', value: 3 }]" class="w-80">
    <template #1>
      标签1
    </template>
    <template #2>
      标签2
    </template>
    <template #3>
      标签3
    </template>
  </FaTabs>
</template>
