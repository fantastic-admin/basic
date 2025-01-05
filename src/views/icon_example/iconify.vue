<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { icons } from '@/iconify'
import { useClipboard } from '@vueuse/core'
import { toast } from 'vue-sonner'

const { copy, isSupported } = useClipboard()

function onCopy(iconName: string) {
  if (isSupported.value) {
    copy(`<FaIcon name="i-${iconName}" />`)
    toast.success('复制成功', {
      description: `<FaIcon name="i-${iconName}" />`,
    })
  }
}
</script>

<template>
  <div>
    <FaPageHeader title="Iconify" description="本框架支持使用 Iconify 的所有图标集，以下展示部分图标集" />
    <FaPageMain v-for="(icon, key) in icons" :key="key" :title="icon.info.name">
      <div class="flex-center-start gap-2">
        <FaButton v-for="(item, index) in icon.info.samples" :key="index" variant="outline" size="icon" @click="onCopy(`${icon.prefix}:${item}`)">
          <FaIcon :name="`${icon.prefix}:${item}`" class="size-4" />
        </FaButton>
      </div>
    </FaPageMain>
  </div>
</template>
