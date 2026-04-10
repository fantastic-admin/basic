<script setup lang="ts">
import { useHotkeyBindings } from '@/hotkeys/useHotkeys'
import Search from './search.vue'

defineOptions({
  name: 'ToolbarMenuSearch',
})

const appSettingsStore = useAppSettingsStore()

const isShow = ref(false)

const useMobileStyle = computed(() => {
  return appSettingsStore.mode !== 'pc' || !appSettingsStore.settings.toolbar.menuSearch.hotkeys
})

useHotkeyBindings({
  'menuSearch.open': () => {
    isShow.value = true
  },
})
</script>

<template>
  <FaButton :variant="useMobileStyle ? 'ghost' : 'outline'" :size="useMobileStyle ? 'icon-sm' : undefined" :class="{ 'mx-2 px-3 h-9': !useMobileStyle }" @click="isShow = true">
    <FaIcon name="i-ri:search-line" class="size-4" />
    <template v-if="!useMobileStyle">
      <FaKbdGroup v-if="appSettingsStore.settings.toolbar.menuSearch.hotkeys" class="-me-1">
        <FaKbd>{{ appSettingsStore.os === 'mac' ? '⌘' : 'Ctrl' }}</FaKbd>
        <FaKbd>K</FaKbd>
      </FaKbdGroup>
    </template>
  </FaButton>
  <Search v-model="isShow" />
</template>
