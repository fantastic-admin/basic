<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'ComponentExampleUpload',
})

const image = ref('https://picsum.photos/750/450')
const images = ref([
  'https://picsum.photos/400',
  'https://picsum.photos/600',
  'https://picsum.photos/500',
])
const files = ref([
  {
    name: '测试文件.zip',
    url: 'http://images.lookbi.com/uploads/apply/96/d8521fc691e472eec91a170201866e7d.zip',
  },
])

function handleSuccess1(res: any) {
  if (res.error === '') {
    image.value = res.data.path
  }
  else {
    ElMessage.warning(res.error)
  }
}
function handleSuccess2(res: any) {
  if (res.error === '') {
    images.value.push(res.data.path)
  }
  else {
    ElMessage.warning(res.error)
  }
}
function handleSuccess3(res: any, file: any, fileList: any) {
  if (res.error === '') {
    files.value.push({
      name: file.name,
      url: res.error === '' ? res.data.path : '',
    })
  }
  else {
    fileList.pop()
    ElMessage.warning(res.error)
  }
}

const tableData = [
  {
    image: 'https://picsum.photos/750/450',
    images: [
      'https://picsum.photos/400',
      'https://picsum.photos/600',
      'https://picsum.photos/500',
    ],
  },
  {
    image: 'https://picsum.photos/750/450',
    images: [
      'https://picsum.photos/400',
      'https://picsum.photos/600',
      'https://picsum.photos/500',
    ],
  },
  {
    image: 'https://picsum.photos/750/450',
    images: [
      'https://picsum.photos/400',
      'https://picsum.photos/600',
      'https://picsum.photos/500',
    ],
  },
  {
    image: 'https://picsum.photos/750/450',
    images: [
      'https://picsum.photos/400',
      'https://picsum.photos/600',
      'https://picsum.photos/500',
    ],
  },
]
</script>

<template>
  <div>
    <PageHeader title="上传">
      <template #content>
        <p>ImageUpload / ImagesUpload / FileUpload</p>
        <p style="margin-bottom: 0;">
          由于线上演示环境开启了 Mock ，会导致上传功能报错，请在本地运行并查看演示
        </p>
      </template>
    </PageHeader>
    <PageMain title="单图上传">
      <ImageUpload v-model:url="image" action="https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/image" name="image" :width="250" :height="150" @on-success="handleSuccess1" />
    </PageMain>
    <PageMain title="多图上传（默认最多3张）">
      <ImagesUpload v-model:url="images" action="https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/image" name="image" @on-success="handleSuccess2" />
    </PageMain>
    <PageMain title="文件上传（默认最多3个）">
      <FileUpload :files="files" action="https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/file" @on-success="handleSuccess3" />
    </PageMain>
    <PageMain title="结合 el-table 使用">
      <ElTable :data="tableData" style="width: 100%;">
        <ElTableColumn type="index" width="50" fixed="left" />
        <ElTableColumn label="单张图片">
          <template #default="{ row }">
            <ImageUpload v-model:url="row.image" action="https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/image" name="image" :width="250" :height="150" @on-success="handleSuccess1" />
          </template>
        </ElTableColumn>
        <ElTableColumn label="多张图片">
          <template #default="{ row }">
            <ImagesUpload v-model:url="row.images" action="https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/image" name="image" @on-success="handleSuccess2" />
          </template>
        </ElTableColumn>
      </ElTable>
    </PageMain>
  </div>
</template>
