<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'FaCopyright',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <footer v-if="settingsStore.settings.copyright.enable" class="my-4 flex flex-wrap items-center justify-center px-4 text-sm text-secondary-foreground/50">
    <span class="px-1">Copyright</span>
    <FaIcon name="i-ri:copyright-line" class="size-5" />
    <span v-if="settingsStore.settings.copyright.dates" class="px-1">{{ settingsStore.settings.copyright.dates }}</span>
    <template v-if="settingsStore.settings.copyright.company">
      <a v-if="settingsStore.settings.copyright.website" :href="settingsStore.settings.copyright.website" target="_blank" rel="noopener" class="px-1 text-center no-underline transition hover-text-secondary-foreground">{{ settingsStore.settings.copyright.company }}</a>
      <span v-else class="px-1">{{ settingsStore.settings.copyright.company }}</span>
    </template>
    <a v-if="settingsStore.settings.copyright.beian" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" class="px-1 text-center no-underline transition hover-text-secondary-foreground">{{ settingsStore.settings.copyright.beian }}</a>
  </footer>
</template>
