<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const tabs = ref(1)
</script>

<template>
  <div>
    <FaPageHeader title="标签页" description="FaTabs" />
    <FaPageMain>
      <FaTabs v-model="tabs" :list="[{ label: '标签1', value: 1 }, { label: '标签2', value: 2 }, { label: '标签3', value: 3 }]" class="w-80">
        <template #1>
          <div class="flex-center">
            标签1
          </div>
        </template>
        <template #2>
          <div class="flex-center">
            标签2
          </div>
        </template>
        <template #3>
          <div class="flex-center">
            标签3
          </div>
        </template>
      </FaTabs>
    </FaPageMain>
  </div>
</template>
