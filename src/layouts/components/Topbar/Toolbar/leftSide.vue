<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import Breadcrumb from './Breadcrumb/index.vue'

defineOptions({
  name: 'ToolbarLeftSide',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="flex items-center">
    <div v-if="settingsStore.mode === 'mobile'" class="flex-center cursor-pointer px-2 py-1 -rotate-z-180" @click="settingsStore.toggleSidebarCollapse()">
      <SvgIcon name="toolbar-collapse" />
    </div>
    <Breadcrumb v-if="settingsStore.settings.toolbar.breadcrumb" />
  </div>
</template>
