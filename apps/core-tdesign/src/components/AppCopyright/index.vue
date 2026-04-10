<script setup lang="ts">
defineOptions({
  name: 'AppCopyright',
})

const route = useRoute()
const appSettingsStore = useAppSettingsStore()
</script>

<template>
  <footer v-if="route.meta.copyright ?? appSettingsStore.settings.app.copyright.enable" class="text-sm text-secondary-foreground/50 my-4 px-4 flex flex-wrap items-center justify-center">
    <span class="px-1">Copyright</span>
    <FaIcon name="i-ri:copyright-line" class="size-5" />
    <span v-if="appSettingsStore.settings.app.copyright.dates" class="px-1">{{ appSettingsStore.settings.app.copyright.dates }}</span>
    <template v-if="appSettingsStore.settings.app.copyright.company">
      <a v-if="appSettingsStore.settings.app.copyright.website" :href="appSettingsStore.settings.app.copyright.website" target="_blank" rel="noopener" class="px-1 text-center no-underline transition-colors hover-text-secondary-foreground">{{ appSettingsStore.settings.app.copyright.company }}</a>
      <span v-else class="px-1">{{ appSettingsStore.settings.app.copyright.company }}</span>
    </template>
  </footer>
</template>
