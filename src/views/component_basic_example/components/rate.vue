<script setup lang="ts">
const value1 = ref()
const value2 = ref()
const value3 = ref(3.7)
</script>

<template>
  <div>
    <el-divider content-position="left">
      基础用法
    </el-divider>
    <el-rate v-model="value1" />
    <el-divider content-position="left">
      辅助文字
    </el-divider>
    <el-rate v-model="value2" show-text :texts="['极差', '差', '一般', '好', '极好']" />
    <el-divider content-position="left">
      只读
    </el-divider>
    <el-rate v-model="value3" disabled show-score text-color="#ff9900" score-template="{value}" />
  </div>
</template>
