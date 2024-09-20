<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'ToolbarRightSide',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <span class="flex-center cursor-pointer px-2 py-1" @click="eventBus.emit('global-search-toggle')">
    <SvgIcon v-if="settingsStore.mode === 'mobile'" name="i-ri:search-line" />
    <span v-else class="group inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-2 bg-stone-1 px-2 py-1.5 text-dark ring-stone-3 ring-inset transition dark-bg-stone-9 dark-text-white hover-ring-1 dark-ring-stone-7">
      <SvgIcon name="i-ri:search-line" />
      <span class="text-sm text-stone-5 transition group-hover-text-dark dark-group-hover-text-white">搜索</span>
      <HKbd v-if="settingsStore.settings.navSearch.enableHotkeys" class="ml-2">{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} S</HKbd>
    </span>
  </span>
</template>
