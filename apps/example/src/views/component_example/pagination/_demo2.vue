<script setup lang="ts">
const page = ref(1)
const size = ref(10)
const total = ref(100)
</script>

<template>
  <FaPagination :page="page" :size="size" :total="total" layout="jumper, pager, ->, total, sizes" />
  <div class="my-4 border-t" />
  <FaPagination :page="page" :size="size" :total="total" layout="pager" />
</template>
