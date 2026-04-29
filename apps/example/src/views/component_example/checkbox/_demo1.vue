<script setup lang="ts">
const checked = ref(false)
</script>

<template>
  <div class="flex gap-4">
    <FaCheckbox v-model="checked">
      同意协议
    </FaCheckbox>
  </div>
</template>
