<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

function getPermission() {
  userStore.getPermissions().then((res) => {
    ElNotification({
      title: '当前用户权限',
      dangerouslyUseHTMLString: true,
      message: res.map(p => `<p>${p}</p>`).join(''),
    })
  })
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <PageHeader title="Mock" content="通过拦截 Ajax 请求，返回模拟的响应数据，可以让前端工程师独立于后端进行开发，本演示站的登录和权限获取就是通过 mock 实现的。更多 Mock 语法规则请查询官方文档">
      <ElButton @click="open('http://mockjs.com/')">
        <template #icon>
          <SvgIcon name="ep:link" />
        </template>
        Mock.js 官网
      </ElButton>
    </PageHeader>
    <PageMain>
      <ElButton @click="getPermission">
        测试：获取用户权限
      </ElButton>
    </PageMain>
  </div>
</template>
