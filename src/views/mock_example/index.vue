<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { useFaNotification } from '@/ui/components/FaNotification'

const userStore = useUserStore()

function getPermission() {
  userStore.getPermissions().then(() => {
    useFaNotification().toast({
      title: '当前用户权限',
      description: h('div', {
        innerHTML: userStore.permissions.map(p => `<p>${p}</p>`).join(''),
      }),
      duration: 3000,
    })
  })
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <FaPageHeader title="Mock" description="通过拦截 Ajax 请求，返回模拟的响应数据，可以让前端工程师独立于后端进行开发，本演示站的登录和权限获取就是通过 faker 实现的。更多语法规则请查询官方文档">
      <FaButton variant="outline" @click="open('https://github.com/faker-js/faker')">
        <FaIcon name="i-ep:link" />
        faker 官网
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <FaButton @click="getPermission">
        测试：获取用户权限
      </FaButton>
    </FaPageMain>
  </div>
</template>
