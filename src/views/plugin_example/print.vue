<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import printJS from 'print-js'
import Alert from './components/alert.vue'
import img from '@/assets/images/login-banner.png'

const tableData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
  },
])

function print(type: 'json' | 'image') {
  if (type === 'json') {
    printJS({
      printable: tableData.value,
      properties: ['date', 'name', 'address'],
      type: 'json',
      gridHeaderStyle: 'color: red; border: 1px solid #3971A5;',
      gridStyle: 'border: 1px solid #3971A5;',
    })
  }
  else if (type === 'image') {
    printJS({
      printable: [
        img,
        img,
      ],
      type: 'image',
      imageStyle: 'width: 50%; margin-bottom: 20px;',
    })
  }
}
function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="打印">
      <template #content>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add print-js</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/crabbly/print.js')">
        <template #icon>
          <SvgIcon name="ep:link" />
        </template>
        访问 print.js
      </ElButton>
    </PageHeader>
    <PageMain title="打印JSON">
      <ElTable :data="tableData" stripe border :style="{ width: '100%' }">
        <ElTableColumn prop="date" label="日期" width="180" />
        <ElTableColumn prop="name" label="姓名" width="180" />
        <ElTableColumn prop="address" label="地址" />
      </ElTable>
      <ElButton @click="print('json')">
        打印
      </ElButton>
    </PageMain>
    <PageMain title="打印图片">
      <ElButton @click="print('image')">
        打印
      </ElButton>
    </PageMain>
  </div>
</template>
