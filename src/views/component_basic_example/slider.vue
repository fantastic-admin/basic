<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import Alert from './components/alert.vue'

const value1 = ref(0)
const value2 = ref(50)
const value3 = ref(36)
const value4 = ref(48)
const value5 = ref(42)
const value6 = ref(0)
const value7 = ref(0)
const value8 = ref([4, 8])
const value9 = ref(0)

function formatTooltip(val: number) {
  return val / 100
}
</script>

<template>
  <div>
    <Alert />
    <page-header title="滑块" />
    <page-main title="基础用法" class="demo">
      <span class="demonstration">默认</span>
      <el-slider v-model="value1" />
      <span class="demonstration">自定义初始值</span>
      <el-slider v-model="value2" />
      <span class="demonstration">隐藏 Tooltip</span>
      <el-slider v-model="value3" :show-tooltip="false" />
      <span class="demonstration">格式化 Tooltip</span>
      <el-slider v-model="value4" :format-tooltip="formatTooltip" />
      <span class="demonstration">禁用</span>
      <el-slider v-model="value5" disabled />
    </page-main>
    <page-main title="离散值" class="demo">
      <span class="demonstration">不显示间断点</span>
      <el-slider v-model="value6" :step="10" />
      <span class="demonstration">显示间断点</span>
      <el-slider v-model="value6" :step="10" show-stops />
    </page-main>
    <page-main title="带有输入框" class="demo">
      <el-slider v-model="value7" show-input />
    </page-main>
    <page-main title="范围选择" class="demo">
      <el-slider v-model="value8" range show-stops :max="10" />
    </page-main>
    <page-main title="竖向模式" class="demo">
      <el-slider v-model="value9" vertical height="200px" />
    </page-main>
  </div>
</template>
