<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import Alert from './components/alert.vue'

const value = ref(true)
const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(false)
</script>

<template>
  <div>
    <Alert />
    <page-header title="开关" />
    <page-main title="基础用法" class="demo">
      <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" />
    </page-main>
    <page-main title="文字描述" class="demo">
      <el-switch v-model="value1" active-text="按月付费" inactive-text="按年付费" />
    </page-main>
    <page-main title="禁用状态" class="demo">
      <el-switch v-model="value2" disabled style="margin-right: 10px;" />
      <el-switch v-model="value3" disabled />
    </page-main>
  </div>
</template>
