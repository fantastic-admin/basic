<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const value = ref('')
</script>

<template>
  <div>
    <FaPageHeader title="文本域" description="FaTextarea" />
    <FaPageMain>
      <FaTextarea v-model="value" placeholder="请输入内容" />
    </FaPageMain>
  </div>
</template>
