<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <FaPageMain>
    <FaButton @click="router.go(-1)">
      返回
    </FaButton>
  </FaPageMain>
</template>
