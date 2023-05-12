<script setup lang="ts">
const num = ref(1)
const num2 = ref(1)
const num3 = ref(5)
const num4 = ref(1)
const num5 = ref(1)
</script>

<template>
  <div>
    <el-divider content-position="left">
      基础用法
    </el-divider>
    <el-input-number v-model="num" :min="1" :max="10" label="描述文字" />
    <el-divider content-position="left">
      禁用状态
    </el-divider>
    <el-input-number v-model="num2" :disabled="true" />
    <el-divider content-position="left">
      步数
    </el-divider>
    <el-input-number v-model="num3" :step="2" />
    <el-divider content-position="left">
      精度
    </el-divider>
    <el-input-number v-model="num4" :precision="2" :step="0.1" :max="10" />
    <el-divider content-position="left">
      按钮位置
    </el-divider>
    <el-input-number v-model="num5" controls-position="right" :min="1" :max="10" />
  </div>
</template>
