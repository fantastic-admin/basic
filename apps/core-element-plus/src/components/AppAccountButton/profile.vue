<script setup lang="ts">
import EditPassword from '@/components/AppAccountForm/edit-password.vue'

const active = ref(0)
const tabs = ref([
  {
    title: '基本设置',
    description: '账号的基本信息，头像、昵称等',
  },
  {
    title: '安全设置',
    description: '定期修改密码可以提高帐号安全性',
  },
])
</script>

<template>
  <div class="min-h-full w-full">
    <div class="border-b border-e bg-background flex flex-row right-0 top-0 fixed z-1 overflow-auto md:(flex-col h-full w-40 inset-s-0 bottom-0)">
      <div v-for="(tab, index) in tabs" :key="index" class="px-4 py-3 flex-shrink-0 cursor-pointer transition-background-color space-y-2 hover-bg-accent/50" :class="{ 'bg-accent hover-bg-accent!': active === index }" @click="active = index">
        <div class="text-base text-accent-foreground leading-tight">
          {{ tab.title }}
        </div>
        <div class="text-xs text-accent-foreground/50">
          {{ tab.description }}
        </div>
      </div>
    </div>
    <div class="p-10 pt-20 flex-col-center min-h-full md:(ms-40 pt-10)">
      <div v-if="active === 0">
        请开发者自行扩展
      </div>
      <EditPassword v-if="active === 1" />
    </div>
  </div>
</template>
