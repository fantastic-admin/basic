<script setup lang="ts">
defineOptions({
  name: 'FeatureExampleTableautoheight',
})

const dataList = ref([
  {
    date: '2016-05-02',
    name: 'John Doe',
    address: 'New York No. 1 Lake Park',
  },
  {
    date: '2016-05-04',
    name: 'Jim Green',
    address: 'London No. 1 Lake Park',
  },
  {
    date: '2016-05-01',
    name: 'Joe Black',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'New York No. 2 Lake Park',
  },
  {
    date: '2016-05-04',
    name: 'Jim Beam',
    address: 'London No. 2 Lake Park',
  },
  {
    date: '2016-05-01',
    name: 'John Doe',
    address: 'New York No. 1 Lake Park',
  },
  {
    date: '2016-05-03',
    name: 'Jim Green',
    address: 'London No. 1 Lake Park',
  },
  {
    date: '2016-05-04',
    name: 'John Doe',
    address: 'New York No. 2 Lake Park',
  },
  {
    date: '2016-05-01',
    name: 'Joe Black',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    date: '2016-05-03',
    name: 'Jim Green',
    address: 'London No. 2 Lake Park',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'New York No. 2 Lake Park',
  },
  {
    date: '2016-05-01',
    name: 'Jim Beam',
    address: 'London No. 2 Lake Park',
  },
  {
    date: '2016-05-03',
    name: 'John Doe',
    address: 'New York No. 1 Lake Park',
  },
  {
    date: '2016-05-04',
    name: 'Jim Green',
    address: 'London No. 1 Lake Park',
  },
  {
    date: '2016-05-01',
    name: 'John Doe',
    address: 'New York No. 1 Lake Park',
  },
  {
    date: '2016-05-03',
    name: 'Jim Green',
    address: 'London No. 1 Lake Park',
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'New York No. 2 Lake Park',
  },
  {
    date: '2016-05-04',
    name: 'Jim Beam',
    address: 'London No. 2 Lake Park',
  },
  {
    date: '2016-05-01',
    name: 'John Doe',
    address: 'New York No. 1 Lake Park',
  },
  {
    date: '2016-05-03',
    name: 'John Doe',
    address: 'New York No. 1 Lake Park',
  },
])
</script>

<template>
  <div class="absolute-container">
    <FaPageHeader title="表格高度自适应" class="mb-0" />
    <FaPageMain class="flex-1 overflow-auto" main-class="flex-1 flex flex-col overflow-auto">
      <ElTable :data="dataList" stripe highlight-current-row border height="100%">
        <ElTableColumn type="index" width="50" />
        <ElTableColumn prop="date" label="Date" width="180" />
        <ElTableColumn prop="name" label="Name" width="180" />
        <ElTableColumn prop="address" label="Address" />
      </ElTable>
    </FaPageMain>
  </div>
</template>

<style scoped>
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
