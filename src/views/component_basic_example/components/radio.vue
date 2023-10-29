<script setup lang="ts">
const radio = ref('1')
const radio2 = ref('选中且禁用')
const radio3 = ref(3)
const radio4 = ref('上海')
const radio5 = ref('1')
</script>

<template>
  <div>
    <ElDivider content-position="left">
      基础用法
    </ElDivider>
    <ElRadio v-model="radio" label="1">
      备选项
    </ElRadio>
    <ElRadio v-model="radio" label="2">
      备选项
    </ElRadio>
    <ElDivider content-position="left">
      禁用状态
    </ElDivider>
    <ElRadio v-model="radio2" disabled label="禁用">
      备选项
    </ElRadio>
    <ElRadio v-model="radio2" disabled label="选中且禁用">
      备选项
    </ElRadio>
    <ElDivider content-position="left">
      单选框组
    </ElDivider>
    <ElRadioGroup v-model="radio3">
      <ElRadio :label="3">
        备选项
      </ElRadio>
      <ElRadio :label="6">
        备选项
      </ElRadio>
      <ElRadio :label="9">
        备选项
      </ElRadio>
    </ElRadioGroup>
    <ElDivider content-position="left">
      按钮样式
    </ElDivider>
    <ElRadioGroup v-model="radio4">
      <ElRadioButton label="上海" />
      <ElRadioButton label="北京" />
      <ElRadioButton label="广州" />
      <ElRadioButton label="深圳" />
    </ElRadioGroup>
    <ElDivider content-position="left">
      带有边框
    </ElDivider>
    <ElRadio v-model="radio5" label="1" border>
      备选项1
    </ElRadio>
    <ElRadio v-model="radio5" label="2" border>
      备选项2
    </ElRadio>
  </div>
</template>
