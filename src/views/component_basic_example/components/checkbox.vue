<script setup lang="ts">
const checked = ref(true)
const checked1 = ref(false)
const checked2 = ref(true)
const checkList = ref(['选中且禁用', '复选框 A'])
const checkedCities = ref(['上海', '北京'])
const cities = ref(['上海', '北京', '广州', '深圳'])
const checkboxGroup1 = ref(['上海'])
const checked3 = ref(true)
const checked4 = ref(false)
</script>

<template>
  <div>
    <el-divider content-position="left">
      基础用法
    </el-divider>
    <el-checkbox v-model="checked">
      备选项
    </el-checkbox>
    <el-divider content-position="left">
      禁用状态
    </el-divider>
    <el-checkbox v-model="checked1" disabled>
      备选项1
    </el-checkbox>
    <el-checkbox v-model="checked2" disabled>
      备选项
    </el-checkbox>
    <el-divider content-position="left">
      多选框组
    </el-divider>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A" />
      <el-checkbox label="复选框 B" />
      <el-checkbox label="复选框 C" />
      <el-checkbox label="禁用" disabled />
      <el-checkbox label="选中且禁用" disabled />
    </el-checkbox-group>
    <el-divider content-position="left">
      可选项目数量的限制
    </el-divider>
    <el-checkbox-group v-model="checkedCities" :min="1" :max="2">
      <el-checkbox v-for="city in cities" :key="city" :label="city">
        {{ city }}
      </el-checkbox>
    </el-checkbox-group>
    <el-divider content-position="left">
      按钮样式
    </el-divider>
    <el-checkbox-group v-model="checkboxGroup1">
      <el-checkbox-button v-for="city in cities" :key="city" :label="city">
        {{ city }}
      </el-checkbox-button>
    </el-checkbox-group>
    <el-divider content-position="left">
      带有边框
    </el-divider>
    <el-checkbox v-model="checked3" label="备选项1" border />
    <el-checkbox v-model="checked4" label="备选项2" border />
  </div>
</template>
