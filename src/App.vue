<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import hotkeys from 'hotkeys-js'
import eventBus from './utils/eventBus'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

const settingsStore = useSettingsStore()

const buttonConfig = ref({
  autoInsertSpace: true,
})

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
  let actualWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width'))
  if (['head', 'single'].includes(settingsStore.menu.menuMode)) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
  let actualWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width'))
  if (settingsStore.menu.subMenuCollapse) {
    actualWidth = 64
  }
  return `${actualWidth}px`
})

watch(() => settingsStore.app.colorScheme, () => {
  if (settingsStore.app.colorScheme === 'dark') {
    document.documentElement.classList.add('dark')
  }
  else {
    document.documentElement.classList.remove('dark')
  }
}, {
  immediate: true,
})

watch(() => settingsStore.mode, () => {
  if (settingsStore.mode === 'pc') {
    settingsStore.$patch((state) => {
      state.menu.subMenuCollapse = settingsStore.subMenuCollapseLastStatus
    })
  }
  else if (settingsStore.mode === 'mobile') {
    settingsStore.$patch((state) => {
      state.menu.subMenuCollapse = true
    })
  }
  document.body.setAttribute('data-mode', settingsStore.mode)
}, {
  immediate: true,
})

watch(() => settingsStore.menu.menuMode, () => {
  document.body.setAttribute('data-menu-mode', settingsStore.menu.menuMode)
}, {
  immediate: true,
})

watch([
  () => settingsStore.app.enableDynamicTitle,
  () => settingsStore.title,
], () => {
  if (settingsStore.app.enableDynamicTitle && settingsStore.title) {
    const title = settingsStore.title
    document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
  }
  else {
    document.title = import.meta.env.VITE_APP_TITLE
  }
}, {
  immediate: true,
})

onMounted(() => {
  settingsStore.setMode(document.documentElement.clientWidth)
  window.onresize = () => {
    settingsStore.setMode(document.documentElement.clientWidth)
  }
  hotkeys('alt+i', () => {
    eventBus.emit('global-system-info-toggle')
  })
})
</script>

<template>
  <el-config-provider :locale="zhCn" :size="settingsStore.app.elementSize" :button="buttonConfig">
    <RouterView
      :style="{
        '--g-main-sidebar-actual-width': mainSidebarActualWidth,
        '--g-sub-sidebar-actual-width': subSidebarActualWidth,
      }"
    />
    <system-info />
  </el-config-provider>
</template>
