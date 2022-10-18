<route lang="yaml">
meta:
enabled: false
</route>

<script lang="ts" setup name="ComponentExampleTableHeightAdaption">
const dataList = ref([
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
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
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

const keywords = ref('')
const dataRange = ref<any>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])

const searchMore = ref(false)
</script>

<template>
  <div class="absolute-container">
    <page-header title="数据表格显示">

      <template #content>
        <p style="margin-bottom: 0;">
          数据表格显示
        </p>
      </template>
    </page-header>
    <page-main>
      <search-bar show-more unfold @toggle="searchMore = $event">
        <el-form :model="search" size="default" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="关键字">
                <el-input v-model="keywords" placeholder="关键字查询" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时间区间">
                <el-date-picker v-model="dataRange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary">
              <template #icon>
                <el-icon>
                  <svg-icon name="ep:search" />
                </el-icon>
              </template>
              筛选
            </el-button>
            <el-button>导出</el-button>
          </el-form-item>
        </el-form>
      </search-bar>
      <el-table :data="dataList" border stripe highlight-current-row height="100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </page-main>
  </div>
</template>

<style lang="scss" scoped>
.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-main {
    // 让 page-main 的高度自适应
    flex: 1;
    overflow: auto;
    margin-top: 0;
    display: flex;
    flex-direction: column;

    .el-button {
      margin-top: 20px;
    }
  }
}
</style>
