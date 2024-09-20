<script setup lang="ts">
import useKeepAliveStore from '@/store/modules/keepAlive'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/utils/eventBus'
import hotkeys from 'hotkeys-js'
import AppSetting from './components/AppSetting/index.vue'
import BackTop from './components/BackTop/index.vue'
import Copyright from './components/Copyright/index.vue'
import Header from './components/Header/index.vue'
import HotkeysIntro from './components/HotkeysIntro/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import Search from './components/Search/index.vue'
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

const mainPage = useMainPage()
const menu = useMenu()

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
  let actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width'))
  if (settingsStore.settings.menu.mode === 'single' || (settingsStore.settings.menu.mode === 'head' && settingsStore.mode !== 'mobile')) {
    actualWidth = 0
  }
  return `${actualWidth}px`
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
  return `${actualWidth}px`
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

onMounted(() => {
  hotkeys('f5', (e) => {
    if (settingsStore.settings.toolbar.pageReload) {
      e.preventDefault()
      mainPage.reload()
    }
  })
  hotkeys('alt+`', (e) => {
    if (settingsStore.settings.menu.enableHotkeys) {
      e.preventDefault()
      menu.switchTo(menuStore.actived + 1 < menuStore.allMenus.length ? menuStore.actived + 1 : 0)
    }
  })
})
onUnmounted(() => {
  hotkeys.unbind('f5')
  hotkeys.unbind('alt+`')
})

const enableAppSetting = import.meta.env.VITE_APP_SETTING === 'true'
</script>

<template>
  <div
    class="layout" :style="{
      '--g-main-sidebar-actual-width': mainSidebarActualWidth,
      '--g-sub-sidebar-actual-width': subSidebarActualWidth,
    }"
  >
    <div id="app-main">
      <Header />
      <div class="wrapper">
        <div class="sidebar-container" :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }">
          <MainSidebar />
          <SubSidebar />
        </div>
        <div class="sidebar-mask" :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()" />
        <div class="main-container">
          <Topbar />
          <div class="main">
            <RouterView v-slot="{ Component, route }">
              <Transition name="slide-right" mode="out-in">
                <KeepAlive :include="keepAliveStore.list">
                  <component :is="Component" v-show="!isLink" :key="route.fullPath" />
                </KeepAlive>
              </Transition>
            </RouterView>
            <LinkView v-if="isLink" />
          </div>
          <Copyright />
        </div>
      </div>
    </div>
    <Search />
    <HotkeysIntro />
    <template v-if="enableAppSetting">
      <div class="app-setting" @click="eventBus.emit('global-app-setting-toggle')">
        <SvgIcon name="i-uiw:setting-o" class="icon" />
      </div>
      <AppSetting />
    </template>
    <BackTop />
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
  transition: padding-top 0.3s;

  .sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1010;
    display: flex;
    width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color);
    transition: width 0.3s, transform 0.3s, box-shadow 0.3s, top 0.3s;

    &:has(> .main-sidebar-container.main-sidebar-enter-active),
    &:has(> .main-sidebar-container.main-sidebar-leave-active) {
      overflow: hidden;
    }
  }

  .sidebar-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    visibility: hidden;
    background-image: radial-gradient(transparent 1px, rgb(0 0 0 / 30%) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    opacity: 0;
    transition: all 0.2s;

    &.show {
      visibility: visible;
      opacity: 1;
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
    background-color: var(--g-bg);
    box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color);
    transition: margin-left 0.3s, background-color 0.3s, box-shadow 0.3s;

    .main {
      position: relative;
      flex: auto;
      height: 100%;
      overflow: hidden;
      transition: 0.3s;
    }

    .topbar-container.has-tabbar + .main {
      margin: var(--g-tabbar-height) 0 0;
    }

    .topbar-container.has-toolbar + .main {
      margin: var(--g-toolbar-height) 0 0;
    }

    .topbar-container.has-tabbar.has-toolbar + .main {
      margin: calc(var(--g-tabbar-height) + var(--g-toolbar-height)) 0 0;
    }
  }
}

header:not(.header-leave-active) + .wrapper {
  padding-top: var(--g-header-height);

  .sidebar-container {
    top: var(--g-header-height);

    :deep(.sidebar-logo) {
      display: none;
    }
  }

  .main-container {
    .topbar-container {
      top: var(--g-header-height);
    }
  }
}

.app-setting {
  --uno: text-white dark-text-dark bg-ui-primary;

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
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

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
