<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import Header from './components/Header/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import Search from './components/Search/index.vue'
import HotkeysIntro from './components/HotkeysIntro/index.vue'
import AppSetting from './components/AppSetting/index.vue'
import LinkView from './components/views/link.vue'
import Copyright from './components/Copyright/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useKeepAliveStore from '@/store/modules/keepAlive'
import useMenuStore from '@/store/modules/menu'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'Layout',
})

const routeInfo = useRoute()

const settingsStore = useSettingsStore()
const keepAliveStore = useKeepAliveStore()
const menuStore = useMenuStore()

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
    if (settingsStore.settings.toolbar.enablePageReload) {
      e.preventDefault()
      useMainPage().reload()
    }
  })
  hotkeys('alt+`', (e) => {
    if (settingsStore.settings.menu.enableHotkeys) {
      e.preventDefault()
      useMenu().switchTo(menuStore.actived + 1 < menuStore.allMenus.length ? menuStore.actived + 1 : 0)
    }
  })
})
onUnmounted(() => {
  hotkeys.unbind('f5')
  hotkeys.unbind('alt+`')
})
</script>

<template>
  <div class="layout">
    <div id="app-main">
      <Header />
      <div class="wrapper">
        <div class="sidebar-container" :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }">
          <MainSidebar />
          <SubSidebar />
        </div>
        <div class="sidebar-mask" :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()" />
        <div class="main-container" :style="{ 'padding-bottom': routeInfo.meta.paddingBottom } as any">
          <Topbar v-if="!(settingsStore.settings.menu.menuMode === 'head' && !settingsStore.settings.menu.enableSubMenuCollapseButton && !settingsStore.settings.breadcrumb.enable)" />
          <div class="main">
            <router-view v-slot="{ Component, route }">
              <transition name="main" mode="out-in" appear>
                <keep-alive :include="keepAliveStore.list">
                  <component :is="Component" v-show="!isLink" :key="route.fullPath" />
                </keep-alive>
              </transition>
            </router-view>
            <LinkView v-if="isLink" />
          </div>
          <Copyright />
        </div>
      </div>
      <el-backtop :right="20" :bottom="20" title="回到顶部" />
    </div>
    <Search />
    <HotkeysIntro />
    <div v-if="settingsStore.settings.app.enableAppSetting">
      <svg-icon name="ep:setting" class="app-setting" @click="eventBus.emit('global-app-setting-toggle')" />
      <AppSetting />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  transition: all 0.2s;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: -1px 0 0 0 var(--g-box-shadow-color);
  transition: padding-top 0.3s;

  .sidebar-container {
    position: fixed;
    z-index: 1010;
    top: 0;
    bottom: 0;
    display: flex;
    transition: transform 0.3s, top 0.3s;
    width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
  }

  .sidebar-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(transparent 1px, rgb(0 0 0 / 30%) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    transition: all 0.2s;
    opacity: 0;
    visibility: hidden;

    &.show {
      opacity: 1;
      visibility: visible;
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
    background-color: var(--g-main-bg);
    transition: margin-left 0.3s, background-color 0.3s;

    .topbar-container {
      top: 0;
      z-index: 998;
    }

    .main {
      height: 100%;
      flex: auto;
      position: relative;
      overflow: hidden;
      transition: 0.3s;
    }

    .topbar-container + .main {
      margin: var(--g-topbar-height) 0 0;
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

    :deep(.el-menu) {
      padding-top: 0;
    }
  }

  .main-container {
    .topbar-container {
      top: var(--g-header-height);

      :deep(.tools) {
        display: none;
      }
    }
  }
}

.app-setting {
  position: fixed;
  z-index: 10;
  right: 0;
  top: calc(50% + 250px);
  width: 50px;
  height: 50px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 24px;
  color: #fff;
  background-color: var(--el-color-primary);
  cursor: pointer;

  :deep(svg) {
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

// 主内容区动画
.main-enter-active {
  transition: 0.2s;
}

.main-leave-active {
  transition: 0.15s;
}

.main-enter-from {
  opacity: 0;
  margin-left: -20px;
}

.main-leave-to {
  opacity: 0;
  margin-left: 20px;
}
</style>
