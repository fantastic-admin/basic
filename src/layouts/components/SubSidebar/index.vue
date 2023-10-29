<script setup lang="ts">
import Logo from '../Logo/index.vue'
import Menu from '../Menu/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

defineOptions({
  name: 'SubSidebar',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const sidebarScrollTop = ref(0)

function onSidebarScroll(e: Event) {
  sidebarScrollTop.value = (e.target as HTMLElement).scrollTop
}

const enableSidebar = computed(() => {
  return settingsStore.mode === 'mobile' || (
    ['side', 'head', 'single'].includes(settingsStore.settings.menu.menuMode)
      && menuStore.sidebarMenus.length !== 0
      && !(
        !menuStore.sidebarMenus[0].children
          || menuStore.sidebarMenus[0]?.children.every(item => item.meta?.sidebar === false)
      )
  )
})
</script>

<template>
  <div
    v-if="enableSidebar" class="sub-sidebar-container" :class="{
      'is-collapse': settingsStore.mode === 'pc' && settingsStore.settings.menu.subMenuCollapse,
    }"
  >
    <Logo
      :show-logo="settingsStore.settings.menu.menuMode === 'single'" class="sidebar-logo" :class="{
        'sidebar-logo-bg': settingsStore.settings.menu.menuMode === 'single',
      }"
    />
    <div
      class="sub-sidebar flex-1 transition-shadow-300" :class="{
        shadow: sidebarScrollTop,
      }" @scroll="onSidebarScroll"
    >
      <TransitionGroup name="sub-sidebar">
        <template v-for="(mainItem, mainIndex) in menuStore.allMenus" :key="mainIndex">
          <div v-show="mainIndex === menuStore.actived">
            <Menu :menu="mainItem.children" :value="route.meta.activeMenu || route.path" :default-openeds="menuStore.defaultOpenedPaths" :accordion="settingsStore.settings.menu.subMenuUniqueOpened" :collapse="settingsStore.mode === 'pc' && settingsStore.settings.menu.subMenuCollapse" class="menu" />
          </div>
        </template>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-sidebar-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--g-sub-sidebar-width);
  background-color: var(--g-sub-sidebar-bg);
  transition: background-color 0.3s, left 0.3s, width 0.3s;

  &.is-collapse {
    width: var(--g-sub-sidebar-collapse-width);

    .sidebar-logo {
      &:not(.sidebar-logo-bg) {
        display: none;
      }

      :deep(span) {
        display: none;
      }
    }
  }

  .sidebar-logo {
    background-color: var(--g-sub-sidebar-bg);
    transition: background-color 0.3s;

    &.sidebar-logo-bg {
      background-color: var(--g-sub-sidebar-logo-bg);

      :deep(span) {
        color: var(--g-sub-sidebar-logo-color);
      }
    }
  }

  .sub-sidebar {
    overflow: hidden auto;
    overscroll-behavior: contain;

    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    &.shadow {
      box-shadow: inset 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }

  .menu {
    width: 100%;
  }
}

// 次侧边栏动画
.sub-sidebar-enter-active {
  transition: 0.2s;
}

.sub-sidebar-enter-from,
.sub-sidebar-leave-active {
  opacity: 0;
  transform: translateY(30px) skewY(10deg);
}

.sub-sidebar-leave-active {
  position: absolute;
}
</style>
