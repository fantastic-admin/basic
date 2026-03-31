<script setup lang="ts">
import apiApp from '@/api/modules/app'

const permissions = ref<string[]>([])

function getPermission() {
  apiApp.permission().then((res) => {
    permissions.value = res.data.permissions
  })
}
</script>

<template>
  <div>
    <FaPageHeader title="假数据" description="通过拦截 Ajax 请求，模拟返回响应数据，可以让前端工程师独立于后端进行开发。" />
    <FaPageMain>
      <FaButton @click="getPermission">
        测试：获取用户权限
      </FaButton>
      <div class="mt-4 empty:hidden">
        <div v-for="(p, i) in permissions" :key="i">
          {{ p }}
        </div>
      </div>
    </FaPageMain>
  </div>
</template>
