<script setup lang="ts">
const value = ref('')
</script>

<template>
  <FaTextarea v-model="value" placeholder="console.log('Hello, world!');" align="block" start-class="justify-between" end-class="justify-between">
    <template #start>
      <span>script.ts</span>
      <FaButton variant="ghost" size="icon" class="size-6">
        <FaIcon name="i-ep:refresh" />
      </FaButton>
    </template>
    <template #end>
      <span>Line 1, Column 1</span>
      <FaButton size="sm" class="px-2 h-8">
        Run
        <FaIcon name="i-lucide:corner-down-left" />
      </FaButton>
    </template>
  </FaTextarea>
</template>
