<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
defineOptions({
  name: 'TabExampleNestedTest2',
})

const val = ref('')
</script>

<template>
  <div>
    <PageMain>
      <div>层级 1-1-2</div>
      <ElInput v-model="val" />
    </PageMain>
  </div>
</template>
