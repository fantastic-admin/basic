<script setup lang="ts">
import Breadcrumb from './Breadcrumb/index.vue'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'ToolbarLeftSide',
})

const settingsStore = useSettingsStore()

const enableSubMenuCollapseButton = computed(() => {
  return settingsStore.mode === 'mobile' || settingsStore.settings.menu.enableSubMenuCollapseButton
})
</script>

<template>
  <div class="flex items-center">
    <div v-if="enableSubMenuCollapseButton" class="flex-center cursor-pointer px-2 py-1 transition-transform" :class="{ '-rotate-z-180': settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()">
      <SvgIcon name="toolbar-collapse" />
    </div>
    <Breadcrumb v-if="settingsStore.settings.toolbar.breadcrumb" />
  </div>
</template>
