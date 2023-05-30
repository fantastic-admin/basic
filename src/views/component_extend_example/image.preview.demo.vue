<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    src: 'https://fantastic-admin.gitee.io/logo.png',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    src: 'https://fantastic-admin.gitee.io/logo.png',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    src: 'https://fantastic-admin.gitee.io/logo.png',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    src: 'https://fantastic-admin.gitee.io/logo.png',
  },
]
</script>

<template>
  <div>
    <page-header title="图片预览" content="ImagePreview" />
    <page-main>
      <image-preview src="https://fantastic-admin.gitee.io/logo.png" :width="200" />
    </page-main>
    <page-main title="图片加载失败时">
      <image-preview src="http://www.baidu.com" width="100px" height="100px" />
    </page-main>
    <page-main title="结合 el-table 使用">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="date" label="日期" width="180" fixed="left" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
        <el-table-column label="图片">
          <template #default="{ row }">
            <image-preview :src="row.src" width="100px" height="100px" />
          </template>
        </el-table-column>
      </el-table>
    </page-main>
  </div>
</template>
