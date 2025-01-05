<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const switchVal = ref(false)
</script>

<template>
  <div>
    <FaPageHeader title="开关" description="FaSwitch" />
    <FaPageMain>
      <div class="flex gap-4">
        <FaSwitch v-model="switchVal" />
        <FaSwitch v-model="switchVal" on-icon="ri:sun-line" off-icon="ri:moon-line" />
      </div>
    </FaPageMain>
  </div>
</template>
