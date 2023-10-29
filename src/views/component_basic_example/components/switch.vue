<script setup lang="ts">
const value = ref(true)
const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(false)
</script>

<template>
  <div>
    <ElDivider content-position="left">
      基础用法
    </ElDivider>
    <ElSwitch v-model="value" active-color="#13ce66" inactive-color="#ff4949" />
    <ElDivider content-position="left">
      文字描述
    </ElDivider>
    <ElSwitch v-model="value1" active-text="按月付费" inactive-text="按年付费" />
    <ElDivider content-position="left">
      禁用状态
    </ElDivider>
    <ElSwitch v-model="value2" disabled style="margin-right: 10px;" />
    <ElSwitch v-model="value3" disabled />
  </div>
</template>
