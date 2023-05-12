<script setup lang="ts">
const radio = ref('1')
const radio2 = ref('选中且禁用')
const radio3 = ref(3)
const radio4 = ref('上海')
const radio5 = ref('1')
</script>

<template>
  <div>
    <el-divider content-position="left">
      基础用法
    </el-divider>
    <el-radio v-model="radio" label="1">
      备选项
    </el-radio>
    <el-radio v-model="radio" label="2">
      备选项
    </el-radio>
    <el-divider content-position="left">
      禁用状态
    </el-divider>
    <el-radio v-model="radio2" disabled label="禁用">
      备选项
    </el-radio>
    <el-radio v-model="radio2" disabled label="选中且禁用">
      备选项
    </el-radio>
    <el-divider content-position="left">
      单选框组
    </el-divider>
    <el-radio-group v-model="radio3">
      <el-radio :label="3">
        备选项
      </el-radio>
      <el-radio :label="6">
        备选项
      </el-radio>
      <el-radio :label="9">
        备选项
      </el-radio>
    </el-radio-group>
    <el-divider content-position="left">
      按钮样式
    </el-divider>
    <el-radio-group v-model="radio4">
      <el-radio-button label="上海" />
      <el-radio-button label="北京" />
      <el-radio-button label="广州" />
      <el-radio-button label="深圳" />
    </el-radio-group>
    <el-divider content-position="left">
      带有边框
    </el-divider>
    <el-radio v-model="radio5" label="1" border>
      备选项1
    </el-radio>
    <el-radio v-model="radio5" label="2" border>
      备选项2
    </el-radio>
  </div>
</template>
