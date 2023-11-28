<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import type { VxeColumnPropTypes } from 'vxe-table'
import Alert from './components/alert.vue'

const demo1 = reactive({
  loading: false,
  tableData: [] as any[],
  sexList: [
    {
      label: '女',
      value: '0',
    },
    {
      label: '男',
      value: '1',
    },
  ],
  ageList: [
    {
      label: '大于16岁',
      value: 16,
    },
    {
      label: '大于26岁',
      value: 26,
    },
    {
      label: '大于30岁',
      value: 30,
    },
  ],
})

const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = demo1.sexList.find(item => item.value === cellValue)
  return item ? item.label : ''
}

const filterAgeMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
  return row.age >= value
}

onMounted(() => {
  demo1.loading = true
  setTimeout(() => {
    demo1.tableData = [
      { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' },
      { id: 10007, name: 'Test7', role: 'Test', sex: '0', age: 29, address: 'test abc' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: '0', age: 35, address: 'test abc' },
      { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 21, address: 'test abc' },
      { id: 10010, name: 'Test10', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
      { id: 10011, name: 'Test11', role: 'Test', sex: '0', age: 29, address: 'test abc' },
      { id: 10012, name: 'Test12', role: 'Develop', sex: '1', age: 27, address: 'test abc' },
      { id: 10013, name: 'Test13', role: 'Test', sex: '0', age: 24, address: 'test abc' },
      { id: 10014, name: 'Test14', role: 'Develop', sex: '1', age: 34, address: 'test abc' },
      { id: 10015, name: 'Test15', role: 'Test', sex: '1', age: 21, address: 'test abc' },
      { id: 10016, name: 'Test16', role: 'Develop', sex: '0', age: 20, address: 'test abc' },
      { id: 10017, name: 'Test17', role: 'Test', sex: '1', age: 31, address: 'test abc' },
      { id: 10018, name: 'Test18', role: 'Develop', sex: '0', age: 32, address: 'test abc' },
      { id: 10019, name: 'Test19', role: 'Test', sex: '1', age: 37, address: 'test abc' },
      { id: 10020, name: 'Test20', role: 'Develop', sex: '1', age: 41, address: 'test abc' },
    ]
    demo1.loading = false
  }, 500)
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="vxe-table">
      <template #content>
        <p>Element Plus 自带的 el-table 组件大部分时候只能满足简单需求的使用，如果对表格有更加复杂场景需求下的使用，推荐使用 vxe-table 。</p>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add xe-utils vxe-table</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/x-extends/vxe-table')">
        <template #icon>
          <SvgIcon name="ep:link" />
        </template>
        访问 vxe-table
      </ElButton>
    </PageHeader>
    <PageMain>
      <VxeTable

        stripe border
        height="400"
        :loading="demo1.loading"
        :column-config="{ resizable: true }"
        :row-config="{ isHover: true }"
        :checkbox-config="{ labelField: 'id', highlight: true, range: true }"
        :data="demo1.tableData"
      >
        <VxeColumn type="seq" width="60" />
        <VxeColumn type="checkbox" title="ID" width="140" />
        <VxeColumn field="name" title="Name" sortable />
        <VxeColumn field="sex" title="Sex" :filters="demo1.sexList" :formatter="formatterSex" />
        <VxeColumn field="age" title="Age" sortable :filters="demo1.ageList" :filter-multiple="false" :filter-method="filterAgeMethod" />
        <VxeColumn field="address" title="Address" show-overflow />
      </VxeTable>
    </PageMain>
  </div>
</template>
