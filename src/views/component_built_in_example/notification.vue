<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { faNotification } from '@/ui/components/FaNotification'

function showNotification(type?: 'html') {
  if (type === 'html') {
    faNotification({
      title: 'Fantastic-admin 杰出的管理系统框架',
      description: h('null', {
        innerHTML: '<p class="text-red-500">开箱即用，提供舒适开发体验</p>',
      }),
      duration: 3000,
    })
  }
  else {
    faNotification({
      title: 'Fantastic-admin 杰出的管理系统框架',
      description: '开箱即用，提供舒适开发体验',
      duration: 3000,
    })
  }
}
</script>

<template>
  <div>
    <FaPageHeader title="通知" description="FaNotification" />
    <FaPageMain>
      <div class="flex gap-4">
        <FaButton @click="showNotification()">
          默认
        </FaButton>
        <FaButton @click="showNotification('html')">
          支持 HTML 代码
        </FaButton>
      </div>
    </FaPageMain>
  </div>
</template>
