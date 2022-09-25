<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup name="TabExampleNestedTest2">
const val = ref('')
</script>

<template>
  <div>
    <page-main>
      <div>层级 1-1-2</div>
      <el-input v-model="val" />
    </page-main>
  </div>
</template>
