<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import Tabbar from './Tabbar/index.vue'
import Toolbar from './Toolbar/index.vue'

defineOptions({
  name: 'Topbar',
})

const settingsStore = useSettingsStore()

const enableToolbar = computed(() => {
  return !(
    settingsStore.settings.menu.mode === 'head' && (
      !settingsStore.settings.toolbar.breadcrumb || settingsStore.settings.app.routeBaseOn === 'filesystem'
    )
  )
})

const scrollTop = ref(0)
const scrollOnHide = ref(false)
const topbarHeight = computed(() => {
  const tabbarHeight = settingsStore.settings.tabbar.enable ? Number.parseInt(getComputedStyle(document.documentElement || document.body).getPropertyValue('--g-tabbar-height')) : 0
  const toolbarHeight = enableToolbar.value ? Number.parseInt(getComputedStyle(document.documentElement || document.body).getPropertyValue('--g-toolbar-height')) : 0
  return tabbarHeight + toolbarHeight
})
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
function onScroll() {
  scrollTop.value = (document.documentElement || document.body).scrollTop
}
watch(scrollTop, (val, oldVal) => {
  scrollOnHide.value = settingsStore.settings.topbar.mode === 'sticky' && val > oldVal && val > topbarHeight.value
})
</script>

<template>
  <div
    class="topbar-container" :class="{
      'has-tabbar': settingsStore.settings.tabbar.enable,
      'has-toolbar': enableToolbar,
      [`topbar-${settingsStore.settings.topbar.mode}`]: true,
      'shadow': scrollTop,
      'hide': scrollOnHide,
    }" data-fixed-calc-width
  >
    <Tabbar v-if="settingsStore.settings.tabbar.enable" />
    <Toolbar v-if="enableToolbar" />
  </div>
</template>

<style scoped>
.topbar-container {
  position: absolute;
  top: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 0 0 var(--g-border-color);
  transition: width 0.3s, top 0.3s, transform 0.3s, box-shadow 0.3s;

  &.topbar-fixed,
  &.topbar-sticky {
    position: fixed;

    &.shadow {
      box-shadow: 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }

  &.topbar-sticky.hide {
    top: calc((var(--g-tabbar-height) + var(--g-toolbar-height)) * -1) !important;
  }
}
</style>
