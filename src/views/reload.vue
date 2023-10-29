<route lang="yaml">
name: reload
</route>

<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  router.go(-1)
})
</script>

<template>
  <div />
</template>
