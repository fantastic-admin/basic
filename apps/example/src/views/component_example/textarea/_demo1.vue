<script setup lang="ts">
const value = ref('')
</script>

<template>
  <FaTextarea v-model="value" placeholder="请输入内容" />
</template>
