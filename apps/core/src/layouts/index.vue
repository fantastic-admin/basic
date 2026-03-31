<script setup lang="ts">
import { useElementSize, useScroll } from '@vueuse/core'
import { useHotkeyBindings } from '@/hotkeys/useHotkeys'
import { useSlots } from '@/slots'
import { cn } from '@/utils'
import eventBus from '@/utils/eventBus'
import AppSetting from './components/AppSetting/index.vue'
import Header from './components/Header/index.vue'
import Hotkeys from './components/Hotkeys/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import LinkView from './components/views/link.vue'

defineOptions({
  name: 'Layout',
})

const routeInfo = useRoute()

const appSettingsStore = useAppSettingsStore()
const appKeepAliveStore = useAppKeepAliveStore()
const appMenuStore = useAppMenuStore()
const mainPage = useAppPage()

useHotkeyBindings({
  'system.info.open': () => {
    eventBus.emit('global-system-info-open')
  },
  'page.reload': () => {
    mainPage.reload()
  },
})

const layoutTopRef = useTemplateRef('layoutTopRef')
const { height: layoutTopHeight } = useElementSize(layoutTopRef)

const layoutBottomRef = useTemplateRef('layoutBottomRef')
const { height: layoutBottomHeight } = useElementSize(layoutBottomRef)

// 头部是否显示
const isHeaderEnable = computed(() => {
  return appSettingsStore.mode === 'pc'
    && appSettingsStore.settings.menu.mode === 'head'
})

// 侧边栏主导航是否显示
const isMainSidebarEnable = computed(() => {
  return appSettingsStore.settings.menu.mode === 'side'
    || (appSettingsStore.mode === 'mobile' && appSettingsStore.settings.menu.mode !== 'single')
})

// 侧边栏次导航是否显示
const isSubSidebarEnable = computed(() => {
  return appSettingsStore.mode === 'mobile'
    || (
      ['side', 'head'].includes(appSettingsStore.settings.menu.mode)
      && appMenuStore.sidebarMenus.length !== 0
      && (
        (
          appSettingsStore.settings.menu.mainMenuClickMode === 'switch'
          && !appMenuStore.sidebarMenus.every(item => item.meta?.menu === false)
        )
        || (
          appSettingsStore.settings.menu.mainMenuClickMode !== 'switch'
          && appMenuStore.sidebarMenus.filter(item => item.meta?.menu !== false).length > 1
        )
      )
    )
    || (
      ['single'].includes(appSettingsStore.settings.menu.mode)
      && appMenuStore.sidebarMenus.length !== 0
      && !appMenuStore.sidebarMenus.every(item => item.meta?.menu === false)
    )
})

// 顶栏是否显示
const isTopbarEnable = computed(() => true)

// 标签栏是否显示
const isTabbarEnable = computed(() => {
  return appSettingsStore.settings.topbar.tabbar
})

// 工具栏是否显示
const isToolbarEnable = computed(() => {
  const { toolbar } = appSettingsStore.settings
  return appSettingsStore.settings.topbar.toolbar && [
    toolbar.breadcrumb,
    toolbar.menuSearch,
    toolbar.fullscreen,
    toolbar.pageReload,
    toolbar.colorScheme,
  ].some((item) => {
    if (typeof item === 'boolean') {
      return item
    }
    return item?.enable ?? false
  })
})

const isLink = computed(() => !!routeInfo.meta.link)

watch(() => appSettingsStore.settings.menu.subMenuCollapse, (val) => {
  if (appSettingsStore.mode === 'mobile') {
    if (!val) {
      document.body.classList.add('overflow-hidden')
    }
    else {
      document.body.classList.remove('overflow-hidden')
    }
  }
})

watch(() => routeInfo.path, () => {
  if (appSettingsStore.mode === 'mobile') {
    appSettingsStore.$patch((state) => {
      state.settings.menu.subMenuCollapse = true
    })
  }
})

const { y } = useScroll(window)
const { height: fixedContentBeforeAreaHeight } = useElementSize(useTemplateRef('fixedContentBeforeAreaRef'))
const { height: fixedContentAfterAreaHeight } = useElementSize(useTemplateRef('fixedContentAfterAreaRef'))
const topbarScrollVisibleOrHidden = ref(false)
eventBus.on('topbar-scroll-visible-or-hidden', (val) => {
  topbarScrollVisibleOrHidden.value = val
})

const enableAppSetting = import.meta.env.VITE_APP_SETTING
</script>

<template>
  <div
    class="layout h-full" :style="{
      '--g-slots-layout-top-height': `${layoutTopHeight}px`,
      '--g-slots-layout-bottom-height': `${layoutBottomHeight}px`,
      '--g-header-actual-height': isHeaderEnable ? 'var(--g-header-height)' : '0px',
      '--g-main-sidebar-actual-width': isMainSidebarEnable ? 'var(--g-main-sidebar-width)' : '0px',
      '--g-sub-sidebar-actual-width': isSubSidebarEnable ? (appSettingsStore.settings.menu.subMenuCollapse && appSettingsStore.mode !== 'mobile' ? 'var(--g-sub-sidebar-collapse-width)' : 'var(--g-sub-sidebar-width)') : '0px',
      '--g-topbar-height': 'calc(var(--g-tabbar-actual-height) + var(--g-toolbar-actual-height))',
      '--g-topbar-actual-height': isTopbarEnable ? 'calc(var(--g-tabbar-actual-height) + var(--g-toolbar-actual-height))' : '0px',
      '--g-tabbar-actual-height': isTabbarEnable ? 'var(--g-tabbar-height)' : '0px',
      '--g-toolbar-actual-height': isToolbarEnable ? 'var(--g-toolbar-height)' : '0px',
      '--g-main-container-padding-top': `${fixedContentBeforeAreaHeight}px`,
      '--g-main-container-padding-bottom': `${fixedContentAfterAreaHeight}px`,
    }"
  >
    <div ref="layoutTopRef" class="slots-layout-top mx-auto bg-background w-full shadow-[-1px_0_0_0_oklch(var(--border)),1px_0_0_0_oklch(var(--border)),0_-1px_0_0_oklch(var(--border)),0_1px_0_0_oklch(var(--border))] transition-width-300 inset-t-0 fixed z-1030 empty:hidden">
      <Component :is="useSlots('layout-top')" />
    </div>
    <Header :enable="isHeaderEnable" />
    <div class="wrapper">
      <div class="sidebar-container" :class="{ show: appSettingsStore.mode === 'mobile' && !appSettingsStore.settings.menu.subMenuCollapse }">
        <MainSidebar :enable="isMainSidebarEnable" />
        <SubSidebar :enable="isSubSidebarEnable" />
      </div>
      <!-- 移动端下，展开侧边栏时的遮罩层 -->
      <div :class="cn('invisible fixed inset-0 z-1009 bg-black/50 op-0 backdrop-blur-sm transition-opacity', { 'op-100 visible': appSettingsStore.mode === 'mobile' && !appSettingsStore.settings.menu.subMenuCollapse })" @click="appSettingsStore.toggleSidebarCollapse()" />
      <div class="main-container pb-[calc(var(--g-slots-layout-bottom-height)+var(--g-main-container-padding-bottom,0px))] pt-[calc(var(--g-slots-layout-top-height)+var(--g-header-actual-height)+var(--g-topbar-actual-height))]">
        <div
          class="fixed-content-around-area w-full inset-t-[calc(var(--g-slots-layout-top-height)+var(--g-header-actual-height))] inset-inline-1/2 fixed z-1005" :style="{
            ...(appSettingsStore.settings.topbar.mode === 'static' && { marginTop: `calc(min(var(--g-topbar-actual-height), ${y}px) * -1)` }),
            ...(topbarScrollVisibleOrHidden && { translate: '0 calc(var(--g-topbar-actual-height) * -1)' }),
          }"
        >
          <Topbar :enable="isTopbarEnable" :enable-tabbar="isTabbarEnable" :enable-toolbar="isToolbarEnable" />
          <div id="fixed-content-before-area" ref="fixedContentBeforeAreaRef" class="shadow-[0_1px_0_0_oklch(var(--border)),0_-1px_0_0_oklch(var(--border))] relative z-1 empty:hidden" />
        </div>
        <div id="app-content" class="main">
          <RouterView v-slot="{ Component, route }">
            <Transition :name="!appSettingsStore.isReloading ? 'fade' : ''" mode="out-in">
              <KeepAlive :include="appKeepAliveStore.list">
                <Component :is="Component" v-show="!isLink" :key="route.fullPath" />
              </KeepAlive>
            </Transition>
          </RouterView>
          <LinkView v-if="isLink" />
        </div>
        <div class="copyright">
          <AppCopyright />
        </div>
        <div class="fixed-content-around-area w-full inset-b-0 inset-inline-1/2 fixed z-1005">
          <div id="fixed-content-after-area" ref="fixedContentAfterAreaRef" class="shadow-[0_1px_0_0_oklch(var(--border)),0_-1px_0_0_oklch(var(--border))] relative z-1 empty:hidden" />
        </div>
      </div>
    </div>
    <div ref="layoutBottomRef" class="slots-layout-bottom mx-auto bg-background w-full shadow-[-1px_0_0_0_oklch(var(--border)),1px_0_0_0_oklch(var(--border)),0_-1px_0_0_oklch(var(--border)),0_1px_0_0_oklch(var(--border))] transition-width-300 inset-b-0 fixed z-1030 empty:hidden">
      <Component :is="useSlots('layout-bottom')" />
    </div>
    <Hotkeys />
    <template v-if="enableAppSetting">
      <div class="text-primary-foreground rounded-l-md bg-primary flex-center size-12 cursor-pointer inset-e-0 inset-t-[calc(50%+250px)] fixed z-10" @click="eventBus.emit('global-app-setting-toggle')">
        <FaIcon name="i-uiw:setting-o" class="size-6 animate-spin animate-duration-3000" />
      </div>
      <AppSetting />
    </template>
    <Component :is="useSlots('free-position')" />
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
    padding-inline-start: 0 !important;
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
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: width 0.3s;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .sidebar-container {
    position: fixed;
    top: calc(var(--g-slots-layout-top-height) + var(--g-header-actual-height));
    bottom: var(--g-slots-layout-bottom-height);
    z-index: 1010;
    display: flex;
    width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    transition: width 0.3s, transform 0.3s, top 0.3s, box-shadow 0.15s;

    &:has(> .main-sidebar-container.main-sidebar-enter-active),
    &:has(> .main-sidebar-container.main-sidebar-leave-active),
    &:has(> .sub-sidebar-container.sub-sidebar-enter-active),
    &:has(> .sub-sidebar-container.sub-sidebar-leave-active) {
      overflow: hidden;
    }
  }

  .main-sidebar-container:not(.main-sidebar-leave-active) + .sub-sidebar-container {
    inset-inline-start: var(--g-main-sidebar-width);
  }

  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding-inline-start: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    overflow: auto;
    background-color: var(--g-main-area-bg);
    box-shadow: -1px 0 0 0 oklch(var(--border)), 1px 0 0 0 oklch(var(--border));
    transition: padding-inline-start 0.3s, padding 0.3s, background-color 0.15s, box-shadow 0.15s;

    .fixed-content-around-area {
      width: calc(100% - var(--g-main-sidebar-actual-width) - var(--g-sub-sidebar-actual-width));
      padding-right: var(--scrollbar-width, 0);
      transform: translateX(-50%) translateX(calc(var(--g-main-sidebar-actual-width) / 2)) translateX(calc(var(--g-sub-sidebar-actual-width) / 2));
      transform-origin: left;
      transition: width 0.3s, transform 0.3s, translate 0.3s, top 0.3s;

      [data-mode="mobile"] & {
        width: 100% !important;
        transform: translateX(-50%) !important;
      }
    }

    .main {
      position: relative;
      flex: auto;
      width: 100%;
      height: 100%;
      padding-top: var(--g-main-container-padding-top, 0);
      margin: 0 auto;
      overflow: hidden;
      background-color: var(--g-main-area-bg);
      box-shadow: -1px 0 0 0 oklch(var(--border)), 1px 0 0 0 oklch(var(--border));
      transition: padding-top 0.3s, width 0.3s, background-color 0.15s, box-shadow 0.15s;
    }

    .copyright {
      position: relative;
      width: 100%;
      margin-inline: auto;
      background-color: oklch(var(--background));
      box-shadow: -1px 0 0 0 oklch(var(--border)), 1px 0 0 0 oklch(var(--border)), 0 -1px 0 0 oklch(var(--border));
    }
  }
}

/* 主内容区动画 */
.fade-enter-active {
  transition: 0.2s;
}

.fade-leave-active {
  transition: 0.15s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
