<script setup lang="ts">
import { useSlots } from '@/slots'
import useSettingsStore from '@/store/modules/settings'
import ColorScheme from './ColorScheme/index.vue'
import Fullscreen from './Fullscreen/index.vue'
import NavSearch from './NavSearch/index.vue'
import PageReload from './PageReload/index.vue'

defineOptions({
  name: 'ToolbarRightSide',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="flex items-center">
    <NavSearch v-if="settingsStore.settings.toolbar.navSearch" />
    <Fullscreen v-if="settingsStore.settings.toolbar.fullscreen" />
    <PageReload v-if="settingsStore.settings.toolbar.pageReload" />
    <ColorScheme v-if="settingsStore.settings.toolbar.colorScheme" />
    <component :is="useSlots('toolbar-end')" />
  </div>
</template>
