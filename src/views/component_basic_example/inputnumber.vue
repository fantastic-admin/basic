<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import Alert from './components/alert.vue'

const num = ref(1)
const num2 = ref(1)
const num3 = ref(5)
const num4 = ref(1)
const num5 = ref(1)
</script>

<template>
  <div>
    <Alert />
    <page-header title="数字输入框" />
    <page-main title="基础用法" class="demo">
      <el-input-number v-model="num" :min="1" :max="10" label="描述文字" />
    </page-main>
    <page-main title="禁用状态" class="demo">
      <el-input-number v-model="num2" :disabled="true" />
    </page-main>
    <page-main title="步数" class="demo">
      <el-input-number v-model="num3" :step="2" />
    </page-main>
    <page-main title="精度" class="demo">
      <el-input-number v-model="num4" :precision="2" :step="0.1" :max="10" />
    </page-main>
    <page-main title="按钮位置" class="demo">
      <el-input-number v-model="num5" controls-position="right" :min="1" :max="10" />
    </page-main>
  </div>
</template>
