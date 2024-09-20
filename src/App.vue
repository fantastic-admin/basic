<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import hotkeys from 'hotkeys-js'
import Provider from './ui-provider/index.vue'
import eventBus from './utils/eventBus'

const route = useRoute()

const settingsStore = useSettingsStore()
const { auth } = useAuth()

const isAuth = computed(() => {
  return route.matched.every((item) => {
    return auth(item.meta.auth ?? '')
  })
})

// 设置网页 title
watch([
  () => settingsStore.settings.app.enableDynamicTitle,
  () => settingsStore.title,
], () => {
  if (settingsStore.settings.app.enableDynamicTitle && settingsStore.title) {
    const title = typeof settingsStore.title === 'function' ? settingsStore.title() : settingsStore.title
    document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
  }
  else {
    document.title = import.meta.env.VITE_APP_TITLE
  }
}, {
  immediate: true,
  deep: true,
})

onMounted(() => {
  settingsStore.setMode(document.documentElement.clientWidth)
  window.addEventListener('resize', () => {
    settingsStore.setMode(document.documentElement.clientWidth)
  })
  hotkeys('alt+i', () => {
    eventBus.emit('global-system-info-toggle')
  })
})
</script>

<template>
  <Provider>
    <RouterView v-slot="{ Component }">
      <component :is="Component" v-if="isAuth" />
      <NotAllowed v-else />
    </RouterView>
    <SystemInfo />
  </Provider>
</template>
