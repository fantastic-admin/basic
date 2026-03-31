<script setup lang="ts">
const value = ref('')
</script>

<template>
  <FaInput v-model="value" placeholder="请输入密码" type="password" />
</template>
