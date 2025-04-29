<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import Tabbar from './Tabbar/index.vue'
import Toolbar from './Toolbar/index.vue'

defineOptions({
  name: 'Topbar',
})

const settingsStore = useSettingsStore()

const enableToolbar = computed(() => {
  return settingsStore.settings.toolbar.enable && Object.keys(settingsStore.settings.toolbar).some((key) => {
    if (settingsStore.settings.app.routeBaseOn === 'filesystem' && key === 'breadcrumb') {
      return false
    }
    return settingsStore.settings.toolbar[key as keyof typeof settingsStore.settings.toolbar]
  })
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
  <FaSmartFixedBlock position="top" :class="{ 'absolute!': settingsStore.settings.topbar.mode === 'static' }">
    <div
      class="topbar-container transition-[transform,box-shadow]-300" :class="{
        [`topbar-${settingsStore.settings.topbar.mode}`]: true,
        mask: scrollTop,
        hide: scrollOnHide,
      }"
    >
      <Tabbar v-if="settingsStore.settings.tabbar.enable" />
      <Toolbar v-if="enableToolbar" />
    </div>
  </FaSmartFixedBlock>
</template>

<style scoped>
.topbar-container {
  display: flex;
  flex-direction: column;
  width: calc(100% - var(--scrollbar-width, 0px));
  box-shadow: 0 1px 0 0 hsl(var(--border));
  transition: transform 0.3s, box-shadow 0.3s;

  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 50px;
    pointer-events: none;
    content: "";
    background-image: linear-gradient(0deg, transparent, var(--g-main-area-bg));
    box-shadow: 0 -1px 0 0 hsl(var(--border));
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.3s;
  }

  &.topbar-fixed,
  &.topbar-sticky {
    position: fixed;

    &.mask::before {
      opacity: 1;
    }
  }

  &.topbar-sticky.hide {
    transform: translateY(-100%);
  }
}
</style>
