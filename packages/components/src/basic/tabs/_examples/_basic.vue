<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaTabs from '../index.vue'

const activeTab = ref('profile')

const list = [
  { label: '资料', value: 'profile' },
  { label: '账号', value: 'account' },
  { label: '通知', value: 'notice' },
]
</script>

<template>
  <FaTabs v-model="activeTab" :list="list" class="w-96">
    <template #profile>
      <div class="text-sm p-4 rounded-md bg-muted/50">
        这里展示用户基础资料。
      </div>
    </template>
    <template #account>
      <div class="text-sm p-4 rounded-md bg-muted/50">
        这里展示账号安全设置。
      </div>
    </template>
    <template #notice>
      <div class="text-sm p-4 rounded-md bg-muted/50">
        这里展示消息通知偏好。
      </div>
    </template>
  </FaTabs>
</template>
