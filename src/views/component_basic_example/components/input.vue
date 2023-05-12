<script setup lang="ts">
const input = ref('')
const input1 = ref('')
const input2 = ref('')
const textarea = ref('')
</script>

<template>
  <div>
    <el-divider content-position="left">
      基础用法
    </el-divider>
    <el-input v-model="input" placeholder="请输入内容" />
    <el-divider content-position="left">
      禁用状态
    </el-divider>
    <el-input v-model="input" placeholder="请输入内容" :disabled="true" />
    <el-divider content-position="left">
      可清空
    </el-divider>
    <el-input v-model="input" placeholder="请输入内容" clearable />
    <el-divider content-position="left">
      密码框
    </el-divider>
    <el-input v-model="input" placeholder="请输入内容" show-password />
    <el-divider content-position="left">
      带 icon 的输入框
    </el-divider>
    <el-input v-model="input1" placeholder="请选择日期">
      <template #suffix>
        <el-icon class="el-input__icon">
          <svg-icon name="i-ep:calendar" />
        </el-icon>
      </template>
    </el-input>
    <el-input v-model="input2" placeholder="请输入内容">
      <template #prefix>
        <el-icon class="el-input__icon">
          <svg-icon name="i-ep:search" />
        </el-icon>
      </template>
    </el-input>
    <el-divider content-position="left">
      文本域
    </el-divider>
    <el-input v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" />
  </div>
</template>
