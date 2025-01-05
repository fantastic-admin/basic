<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const value = ref('')
</script>

<template>
  <div>
    <FaPageHeader title="输入框" description="FaInput" />
    <FaPageMain>
      <FaInput v-model="value" placeholder="请输入内容" />
    </FaPageMain>
  </div>
</template>
