<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const settingsStore = useSettingsStore()

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <FaButton v-if="settingsStore.mode === 'pc'" variant="ghost" size="icon" class="size-9" @click="toggle">
    <FaIcon :name="isFullscreen ? 'i-ri:fullscreen-exit-line' : 'i-ri:fullscreen-line'" class="size-4" />
  </FaButton>
</template>
