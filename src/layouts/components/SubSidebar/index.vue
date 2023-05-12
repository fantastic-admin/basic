<script setup lang="ts">
import Logo from '../Logo/index.vue'
import SidebarItem from '../SidebarItem/index.vue'
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
</script>

<template>
  <div v-if="['side', 'head', 'single'].includes(settingsStore.settings.menu.menuMode) || settingsStore.mode === 'mobile'" class="sub-sidebar-container" :class="{ 'is-collapse': settingsStore.mode === 'pc' && settingsStore.settings.menu.subMenuCollapse }" @scroll="onSidebarScroll">
    <Logo
      :show-logo="settingsStore.settings.menu.menuMode === 'single'" class="sidebar-logo" :class="{
        'sidebar-logo-bg': settingsStore.settings.menu.menuMode === 'single',
        'shadow': sidebarScrollTop,
      }"
    />
    <transition-group name="sub-sidebar">
      <template v-for="(mainItem, mainIndex) in menuStore.allMenus" :key="mainIndex">
        <div v-show="mainIndex === menuStore.actived">
          <el-menu
            :unique-opened="settingsStore.settings.menu.subMenuUniqueOpened" :default-openeds="menuStore.defaultOpenedPaths" :default-active="route.meta.activeMenu || route.path" :collapse="settingsStore.mode === 'pc' && settingsStore.settings.menu.subMenuCollapse" :collapse-transition="false" :class="{
              'is-collapse-without-logo': settingsStore.settings.menu.menuMode !== 'single' && settingsStore.settings.menu.subMenuCollapse,
            }"
          >
            <template v-for="(item, index) in mainItem.children">
              <SidebarItem v-if="item.meta?.sidebar !== false" :key="item.path || index" :item="item" :base-path="item.path" />
            </template>
          </el-menu>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.sub-sidebar-container {
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;

  // firefox隐藏滚动条
  scrollbar-width: none;

  // chrome隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }

  width: var(--g-sub-sidebar-width);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: var(--g-sub-sidebar-bg);
  box-shadow: 10px 0 10px -10px var(--g-box-shadow-color);
  transition: background-color 0.3s, var(--el-transition-box-shadow), left 0.3s, width 0.3s;

  &.is-collapse {
    width: 64px;

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
    transition: box-shadow 0.2s, background-color 0.3s, color 0.3s;
    background-color: var(--g-sub-sidebar-bg);

    &:not(.sidebar-logo-bg) {
      :deep(span) {
        color: var(--g-sub-sidebar-menu-color);
      }
    }

    &.sidebar-logo-bg {
      background-color: var(--g-main-sidebar-bg);
    }

    &.shadow {
      box-shadow: 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }

  .el-menu {
    border-right: 0;
    padding-top: var(--g-sidebar-logo-height);
    transition: border-color 0.3s, background-color 0.3s, color 0.3s, padding-top 0.3s;
    background-color: var(--g-sub-sidebar-bg);

    &:not(.el-menu--collapse) {
      width: inherit;
    }

    &.is-collapse-without-logo {
      padding-top: 0;
    }

    &.el-menu--collapse {
      :deep(.title-icon) {
        margin-right: 0;
      }

      :deep(.el-menu-item),
      :deep(.el-sub-menu__title) {
        span,
        .el-sub-menu__icon-arrow {
          display: none;
        }
      }
    }

    &.menu-radius:not(.el-menu--collapse) {
      .sidebar-item {
        padding: 0 10px;

        &:first-child {
          padding-top: 10px;
        }

        &:last-child {
          padding-bottom: 10px;
        }
      }

      :deep(.el-menu--inline),
      :deep(.el-menu-item),
      :deep(.el-sub-menu__title) {
        border-radius: 10px;
      }
    }
  }
}

// 次侧边栏动画
.sub-sidebar-enter-active {
  transition: opacity 0.3s, transform 0.3s;
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
