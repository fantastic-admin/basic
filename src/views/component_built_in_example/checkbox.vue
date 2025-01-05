<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const checked = ref(false)
</script>

<template>
  <div>
    <FaPageHeader title="复选框" description="FaCheckbox" />
    <FaPageMain>
      <div class="flex gap-4">
        <FaCheckbox v-model="checked">
          复选框
        </FaCheckbox>
        {{ checked }}
      </div>
    </FaPageMain>
  </div>
</template>
