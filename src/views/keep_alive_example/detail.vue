<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <PageMain>
    <ElButton @click="router.go(-1)">
      返回
    </ElButton>
  </PageMain>
</template>
