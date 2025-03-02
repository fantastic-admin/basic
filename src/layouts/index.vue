<script setup lang="ts">
import { useSlots } from '@/slots'
import useKeepAliveStore from '@/store/modules/keepAlive'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/utils/eventBus'
import AppSetting from './components/AppSetting/index.vue'
import Header from './components/Header/index.vue'
import HotkeysIntro from './components/HotkeysIntro/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import LinkView from './components/views/link.vue'

defineOptions({
  name: 'Layout',
})

const routeInfo = useRoute()

const settingsStore = useSettingsStore()
const keepAliveStore = useKeepAliveStore()
const menuStore = useMenuStore()

// 头部当前实际高度
const headerActualHeight = computed(() => {
  let actualHeight = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-header-height'))
  if (['single', 'side'].includes(settingsStore.settings.menu.mode) || settingsStore.mode === 'mobile') {
    actualHeight = 0
  }
  return actualHeight
})

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
  let actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width'))
  if (settingsStore.settings.menu.mode === 'single' || (settingsStore.settings.menu.mode === 'head' && settingsStore.mode !== 'mobile')) {
    actualWidth = 0
  }
  return actualWidth
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
  let actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width'))
  if (settingsStore.settings.menu.subMenuCollapse && settingsStore.mode !== 'mobile') {
    actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-collapse-width'))
  }
  if (menuStore.sidebarMenus.every(item => item.meta?.menu === false)) {
    actualWidth = 0
  }
  return actualWidth
})

// 顶栏当前实际高度
const topbarActualHeight = computed(() => {
  let actualHeight = 0
  if (settingsStore.settings.tabbar.enable) {
    actualHeight += Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-tabbar-height'))
  }
  if (!['head'].includes(settingsStore.settings.menu.mode) || settingsStore.settings.toolbar.breadcrumb) {
    actualHeight += Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-toolbar-height'))
  }
  return actualHeight
})

const isLink = computed(() => !!routeInfo.meta.link)

watch(() => settingsStore.settings.menu.subMenuCollapse, (val) => {
  if (settingsStore.mode === 'mobile') {
    if (!val) {
      document.body.classList.add('overflow-hidden')
    }
    else {
      document.body.classList.remove('overflow-hidden')
    }
  }
})

watch(() => routeInfo.path, () => {
  if (settingsStore.mode === 'mobile') {
    settingsStore.$patch((state) => {
      state.settings.menu.subMenuCollapse = true
    })
  }
})

const enableAppSetting = import.meta.env.VITE_APP_SETTING
</script>

<template>
  <div
    class="layout" :style="{
      '--g-header-actual-height': `${headerActualHeight}px`,
      '--g-main-sidebar-actual-width': `${mainSidebarActualWidth}px`,
      '--g-sub-sidebar-actual-width': `${subSidebarActualWidth}px`,
      '--g-topbar-actual-height': `${topbarActualHeight}px`,
    }"
  >
    <div id="app-main">
      <Header />
      <div class="wrapper">
        <div class="sidebar-container" :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }">
          <MainSidebar />
          <SubSidebar />
        </div>
        <div class="invisible fixed inset-0 z-1009 bg-black/50 op-0 backdrop-blur-sm transition-opacity" :class="{ 'op-100! visible!': settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()" />
        <div class="main-container pb-[var(--g-main-container-padding-bottom)]">
          <Topbar />
          <div class="main">
            <RouterView v-slot="{ Component, route }">
              <Transition :name="!settingsStore.isReloading ? 'slide-right' : ''" mode="out-in">
                <KeepAlive :include="keepAliveStore.list">
                  <component :is="Component" v-show="!isLink" :key="route.fullPath" />
                </KeepAlive>
              </Transition>
            </RouterView>
            <LinkView v-if="isLink" />
          </div>
          <FaCopyright />
        </div>
      </div>
    </div>
    <HotkeysIntro />
    <template v-if="enableAppSetting">
      <div class="app-setting" @click="eventBus.emit('global-app-setting-toggle')">
        <FaIcon name="i-uiw:setting-o" class="icon" />
      </div>
      <AppSetting />
    </template>
    <component :is="useSlots('free-position')" />
  </div>
</template>

<style scoped>
[data-mode="mobile"] {
  .sidebar-container {
    transform: translateX(calc((var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)) * -1));

    &.show {
      transform: translateX(0);
    }
  }

  .main-container {
    margin-left: 0 !important;
  }

  &[data-menu-mode="single"] {
    .sidebar-container {
      transform: translateX(calc(var(--g-sub-sidebar-width) * -1));

      &.show {
        transform: translateX(0);
      }
    }
  }
}

.layout {
  height: 100%;
}

#app-main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: var(--g-header-actual-height);
  transition: padding-top 0.3s;

  .sidebar-container {
    position: fixed;
    top: var(--g-header-actual-height);
    bottom: 0;
    z-index: 1010;
    display: flex;
    width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    box-shadow: -1px 0 0 0 hsl(var(--border)), 1px 0 0 0 hsl(var(--border));
    transition: width 0.3s, transform 0.3s, box-shadow 0.3s, top 0.3s;

    &:has(> .main-sidebar-container.main-sidebar-enter-active),
    &:has(> .main-sidebar-container.main-sidebar-leave-active),
    &:has(> .sub-sidebar-container.sub-sidebar-enter-active),
    &:has(> .sub-sidebar-container.sub-sidebar-leave-active) {
      overflow: hidden;
    }
  }

  .main-sidebar-container:not(.main-sidebar-leave-active) + .sub-sidebar-container {
    left: var(--g-main-sidebar-width);
  }

  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin-left: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    background-color: var(--g-main-area-bg);
    box-shadow: -1px 0 0 0 hsl(var(--border)), 1px 0 0 0 hsl(var(--border));
    transition: margin-left 0.3s, background-color 0.3s, box-shadow 0.3s;

    .main {
      position: relative;
      flex: auto;
      height: 100%;
      margin: var(--g-topbar-actual-height) 0 0;
      overflow: hidden;
    }
  }
}

.app-setting {
  --uno: bg-primary text-primary-foreground rounded-l-md;

  position: fixed;
  top: calc(50% + 250px);
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;

  .icon {
    animation: rotate 5s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}

/* 主内容区动画 */
.slide-right-enter-active {
  transition: 0.2s;
}

.slide-right-leave-active {
  transition: 0.15s;
}

.slide-right-enter-from {
  margin-left: -20px;
  opacity: 0;
}

.slide-right-leave-to {
  margin-left: 20px;
  opacity: 0;
}
</style>
