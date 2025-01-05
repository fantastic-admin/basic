<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const settingsStore = useSettingsStore()

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <FaButton v-if="settingsStore.mode === 'pc'" variant="ghost" size="icon" @click="toggle">
    <FaIcon :name="isFullscreen ? 'i-ri:fullscreen-exit-line' : 'i-ri:fullscreen-line'" class="size-4" />
  </FaButton>
</template>
