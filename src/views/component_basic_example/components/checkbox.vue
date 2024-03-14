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
    <ElDivider content-position="left">
      基础用法
    </ElDivider>
    <ElCheckbox v-model="checked">
      备选项
    </ElCheckbox>
    <ElDivider content-position="left">
      禁用状态
    </ElDivider>
    <ElCheckbox v-model="checked1" disabled>
      备选项1
    </ElCheckbox>
    <ElCheckbox v-model="checked2" disabled>
      备选项
    </ElCheckbox>
    <ElDivider content-position="left">
      多选框组
    </ElDivider>
    <ElCheckboxGroup v-model="checkList">
      <ElCheckbox value="复选框 A">
        复选框 A
      </ElCheckbox>
      <ElCheckbox value="复选框 B">
        复选框 B
      </ElCheckbox>
      <ElCheckbox value="复选框 C">
        复选框 C
      </ElCheckbox>
      <ElCheckbox value="禁用" disabled>
        禁用
      </ElCheckbox>
      <ElCheckbox value="选中且禁用" disabled>
        选中且禁用
      </ElCheckbox>
    </ElCheckboxGroup>
    <ElDivider content-position="left">
      可选项目数量的限制
    </ElDivider>
    <ElCheckboxGroup v-model="checkedCities" :min="1" :max="2">
      <ElCheckbox v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </ElCheckbox>
    </ElCheckboxGroup>
    <ElDivider content-position="left">
      按钮样式
    </ElDivider>
    <ElCheckboxGroup v-model="checkboxGroup1">
      <ElCheckboxButton v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </ElCheckboxButton>
    </ElCheckboxGroup>
    <ElDivider content-position="left">
      带有边框
    </ElDivider>
    <ElCheckbox v-model="checked3" value="备选项1" border>
      备选项1
    </ElCheckbox>
    <ElCheckbox v-model="checked4" value="备选项2" border>
      备选项2
    </ElCheckbox>
  </div>
</template>
