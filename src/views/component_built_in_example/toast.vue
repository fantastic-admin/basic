<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { toast } from 'vue-sonner'

function showToast(type?: 'success' | 'error' | 'info' | 'warning' | 'loading1' | 'loading2') {
  if (type) {
    if (type === 'loading1') {
      toast.promise(() => new Promise((resolve) => {
        setTimeout(resolve, 2000)
      }), {
        loading: '加载中',
        success: () => '加载成功',
        error: () => '加载失败',
        position: 'top-right',
        duration: 3000,
      })
    }
    else if (type === 'loading2') {
      const loading = toast.loading('加载中', {
        position: 'top-right',
        duration: Infinity,
      })
      setTimeout(() => {
        toast.dismiss(loading)
        toast('Fantastic-admin 杰出的管理系统框架', {
          description: '开箱即用，提供舒适开发体验',
          position: 'top-right',
          duration: 3000,
        })
      }, 2000)
    }
    else {
      toast[type]('Fantastic-admin 杰出的管理系统框架', {
        description: '开箱即用，提供舒适开发体验',
        position: 'top-right',
        duration: 3000,
      })
    }
  }
  else {
    toast('Fantastic-admin 杰出的管理系统框架', {
      description: '开箱即用，提供舒适开发体验',
      position: 'top-right',
      duration: 3000,
    })
  }
}
</script>

<template>
  <div>
    <FaPageHeader title="轻提示" description="FaToast" />
    <FaPageMain>
      <div class="flex gap-4">
        <FaButton @click="showToast()">
          默认
        </FaButton>
        <FaButton @click="showToast('success')">
          成功
        </FaButton>
        <FaButton @click="showToast('error')">
          错误
        </FaButton>
        <FaButton @click="showToast('info')">
          信息
        </FaButton>
        <FaButton @click="showToast('warning')">
          警告
        </FaButton>
        <FaButton @click="showToast('loading1')">
          加载中 1
        </FaButton>
        <FaButton @click="showToast('loading2')">
          加载中 2
        </FaButton>
      </div>
    </FaPageMain>
  </div>
</template>
