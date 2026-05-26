<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaTabs from '../index.vue'

const activeTab = ref('user')

const list = [
  { icon: 'i-lucide:user', label: '用户', value: 'user' },
  { icon: 'i-lucide:settings', label: '设置', value: 'setting' },
  { icon: 'i-lucide:bell', label: '通知', value: 'notice' },
]
</script>

<template>
  <FaTabs v-model="activeTab" :list="list" class="w-96">
    <template #user>
      <div class="text-sm p-4 rounded-md bg-muted/50">
        用户信息内容。
      </div>
    </template>
    <template #setting>
      <div class="text-sm p-4 rounded-md bg-muted/50">
        系统设置内容。
      </div>
    </template>
    <template #notice>
      <div class="text-sm p-4 rounded-md bg-muted/50">
        通知消息内容。
      </div>
    </template>
  </FaTabs>
</template>
