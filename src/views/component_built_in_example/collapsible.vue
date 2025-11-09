<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <div>
    <FaPageHeader title="折叠面板" description="FaCollapsible" />
    <FaPageMain>
      <FaCollapsible>
        <template #trigger="{ open: openStatus }">
          <FaButton>
            {{ openStatus ? '收起' : '展开' }}
          </FaButton>
        </template>
        <div class="mt-4 space-y-2">
          <div v-for="item in 10" :key="item" class="border rounded-md px-4 py-2">
            {{ item }}
          </div>
        </div>
      </FaCollapsible>
    </FaPageMain>
    <FaPageMain title="手动控制">
      <FaButton @click="open = !open">
        {{ open ? '收起' : '展开' }}
      </FaButton>
      <FaCollapsible v-model="open">
        <div class="mt-4 space-y-2">
          <div v-for="item in 10" :key="item" class="border rounded-md px-4 py-2">
            {{ item }}
          </div>
        </div>
      </FaCollapsible>
    </FaPageMain>
  </div>
</template>
