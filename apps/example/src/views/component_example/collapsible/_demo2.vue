<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <FaButton @click="open = !open">
    {{ open ? '收起' : '展开' }}
  </FaButton>
  <FaCollapsible v-model="open">
    <div class="mt-4 space-y-2">
      <div v-for="item in 10" :key="item" class="px-4 py-2 border rounded-md">
        {{ item }}
      </div>
    </div>
  </FaCollapsible>
</template>
