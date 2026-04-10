<script setup lang="ts">
import imgLogo from '@/assets/images/logo.svg'

defineOptions({
  name: 'Logo',
})

withDefaults(
  defineProps<{
    showLogo?: boolean
    showTitle?: boolean
  }>(),
  {
    showLogo: true,
    showTitle: true,
  },
)

const appSettingsStore = useAppSettingsStore()

const title = ref(import.meta.env.VITE_APP_TITLE)
const logo = ref(imgLogo)

const to = computed(() => appSettingsStore.settings.app.home.enable ? appSettingsStore.settings.app.home.fullPath : '')
</script>

<template>
  <RouterLink :to class="text-primary px-3 no-underline flex-center gap-2 h-[var(--g-sidebar-logo-height)] w-inherit" :class="{ 'cursor-default': !appSettingsStore.settings.app.home.enable }" :title="title">
    <img v-if="showLogo" :src="logo" class="logo h-[30px] w-[30px] object-contain">
    <span v-if="showTitle" class="font-bold block truncate">{{ title }}</span>
  </RouterLink>
</template>
