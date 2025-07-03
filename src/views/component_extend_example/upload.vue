<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { toast } from 'vue-sonner'

defineOptions({
  name: 'ComponentExampleUpload',
})

const files = ref([
  {
    name: 'Fantastic-admin.svg',
    url: 'https://fantastic-admin.hurui.me/logo.svg',
  },
])

function handleSuccess(res: any, file: any, fileList: any) {
  if (res.error === '') {
    files.value.push({
      name: file.name,
      url: res.error === '' ? res.data.path : '',
    })
  }
  else {
    fileList.pop()
    toast.warning(res.error)
  }
}
</script>

<template>
  <div>
    <FaPageHeader title="上传">
      <template #description>
        <div class="space-y-2">
          <p>FileUpload</p>
          <p>
            由于线上演示环境开启了 Mock ，会导致上传功能报错，请在本地运行并查看演示
          </p>
        </div>
      </template>
    </FaPageHeader>
    <FaPageMain title="文件上传（默认最多3个）">
      <FileUpload :files="files" action="https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/file" @on-success="handleSuccess" />
    </FaPageMain>
  </div>
</template>
