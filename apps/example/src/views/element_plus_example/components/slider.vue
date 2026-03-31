<script setup lang="ts">
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
    <ElDivider content-position="left">
      基础用法
    </ElDivider>
    <span>默认</span>
    <ElSlider v-model="value1" />
    <span>自定义初始值</span>
    <ElSlider v-model="value2" />
    <span>隐藏 Tooltip</span>
    <ElSlider v-model="value3" :show-tooltip="false" />
    <span>格式化 Tooltip</span>
    <ElSlider v-model="value4" :format-tooltip="formatTooltip" />
    <span>禁用</span>
    <ElSlider v-model="value5" disabled />
    <ElDivider content-position="left">
      离散值
    </ElDivider>
    <span>不显示间断点</span>
    <ElSlider v-model="value6" :step="10" />
    <span>显示间断点</span>
    <ElSlider v-model="value6" :step="10" show-stops />
    <ElDivider content-position="left">
      带有输入框
    </ElDivider>
    <ElSlider v-model="value7" show-input />
    <ElDivider content-position="left">
      范围选择
    </ElDivider>
    <ElSlider v-model="value8" show-stops range :max="10" />
    <ElDivider content-position="left">
      竖向模式
    </ElDivider>
    <ElSlider v-model="value9" vertical height="200px" />
  </div>
</template>
