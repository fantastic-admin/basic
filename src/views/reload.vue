<route lang="yaml">
name: reload
</route>

<script lang="ts" setup>
const router = useRouter()

onMounted(() => {
  router.go(-1)
})
</script>

<template>
  <div />
</template>
