<script setup lang="ts">
const page = ref(1)
const size = ref(10)
const total = ref(100)
</script>

<template>
  <FaPagination :page="page" :size="size" :total="total" />
</template>
