<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const pin = ref('')
</script>

<template>
  <div>
    <FaPageHeader title="数字输入框" description="FaPinInput" />
    <FaPageMain>
      <FaPinInput v-model="pin" />
    </FaPageMain>
  </div>
</template>
