<script setup lang="ts">
const input = ref('')
const input1 = ref('')
const input2 = ref('')
const textarea = ref('')
</script>

<template>
  <div>
    <ElDivider content-position="left">
      基础用法
    </ElDivider>
    <ElInput v-model="input" placeholder="请输入内容" />
    <ElDivider content-position="left">
      禁用状态
    </ElDivider>
    <ElInput v-model="input" placeholder="请输入内容" :disabled="true" />
    <ElDivider content-position="left">
      可清空
    </ElDivider>
    <ElInput v-model="input" placeholder="请输入内容" clearable />
    <ElDivider content-position="left">
      密码框
    </ElDivider>
    <ElInput v-model="input" placeholder="请输入内容" show-password />
    <ElDivider content-position="left">
      带 icon 的输入框
    </ElDivider>
    <ElInput v-model="input1" placeholder="请选择日期">
      <template #suffix>
        <SvgIcon name="ep:calendar" />
      </template>
    </ElInput>
    <ElInput v-model="input2" placeholder="请输入内容">
      <template #prefix>
        <SvgIcon name="ep:search" />
      </template>
    </ElInput>
    <ElDivider content-position="left">
      文本域
    </ElDivider>
    <ElInput v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" />
  </div>
</template>
