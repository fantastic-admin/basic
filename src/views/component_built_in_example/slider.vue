<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const value = ref<number[]>([0])
</script>

<template>
  <div>
    <FaPageHeader title="滑块" description="FaSlider" />
    <FaPageMain>
      <FaSlider v-model="value" />
    </FaPageMain>
    <FaPageMain>
      <FaSlider v-model="value" orientation="vertical" class="data-[orientation=vertical]:h-100" />
    </FaPageMain>
  </div>
</template>
