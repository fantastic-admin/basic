<script setup lang="ts">
const options1 = ref([
  { value: '选项1', label: '黄金糕' },
  { value: '选项2', label: '双皮奶' },
  { value: '选项3', label: '蚵仔煎' },
  { value: '选项4', label: '龙须面' },
  { value: '选项5', label: '北京烤鸭' },
])
const value1 = ref('')
const options2 = ref([
  { value: '选项1', label: '黄金糕' },
  { value: '选项2', label: '双皮奶', disabled: true },
  { value: '选项3', label: '蚵仔煎' },
  { value: '选项4', label: '龙须面' },
  { value: '选项5', label: '北京烤鸭' },
])
const value2 = ref('')
const value3 = ref([])
</script>

<template>
  <div>
    <ElDivider content-position="left">
      基础用法
    </ElDivider>
    <ElSelect v-model="value1" placeholder="请选择">
      <ElOption v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
    </ElSelect>
    <ElDivider content-position="left">
      有禁用选项
    </ElDivider>
    <ElSelect v-model="value2" placeholder="请选择">
      <ElOption v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
    </ElSelect>
    <ElDivider content-position="left">
      禁用状态
    </ElDivider>
    <ElSelect v-model="value1" disabled placeholder="请选择">
      <ElOption v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
    </ElSelect>
    <ElDivider content-position="left">
      可清空单选
    </ElDivider>
    <ElSelect v-model="value1" clearable placeholder="请选择">
      <ElOption v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
    </ElSelect>
    <ElDivider content-position="left">
      基础多选
    </ElDivider>
    <ElSelect v-model="value3" multiple placeholder="请选择">
      <ElOption v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
    </ElSelect>
    <ElDivider content-position="left">
      可搜索
    </ElDivider>
    <ElSelect v-model="value1" filterable placeholder="请选择">
      <ElOption v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
    </ElSelect>
  </div>
</template>
