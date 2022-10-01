<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import Alert from './components/alert.vue'

const makeRange = (start: number, end: number) => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

const value = ref('')
const value1 = ref(new Date(2016, 9, 10, 18, 30))
const startTime = ref('')
const endTime = ref('')

// 如允许 17:30:00 - 18:30:00
const disabledHours = () => {
  return makeRange(0, 16).concat(makeRange(19, 23))
}
const disabledMinutes = (hour: number) => {
  if (hour === 17) {
    return makeRange(0, 29)
  }
  else if (hour === 18) {
    return makeRange(31, 59)
  }
  else {
    return makeRange(0, 59)
  }
}
const disabledSeconds = (hour: number, minute: number) => {
  if (hour === 18 && minute === 30) {
    return makeRange(1, 59)
  }
  else {
    return makeRange(0, 59)
  }
}
</script>

<template>
  <div>
    <Alert />
    <page-header title="时间选择器" />
    <page-main title="固定时间点" class="demo">
      <el-time-select v-model="value" start="08:30" step="00:15" end="18:30" placeholder="选择时间" />
    </page-main>
    <page-main title="限制时间选择范围" class="demo">
      <el-time-picker v-model="value1" :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds" placeholder="任意时间点" />
    </page-main>
    <page-main title="固定时间范围" class="demo">
      <el-time-select v-model="startTime" placeholder="起始时间" start="08:30" step="00:15" end="18:30" style="margin-right: 10px;" />
      <el-time-select v-model="endTime" placeholder="结束时间" start="08:30" step="00:15" end="18:30" :min-time="startTime" />
    </page-main>
  </div>
</template>
