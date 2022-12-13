<script lang="ts" setup name="MainSidebar">
import Logo from '../Logo/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const { switchTo } = useMenu()
</script>

<template>
  <transition name="main-sidebar">
    <div v-if="settingsStore.settings.menu.menuMode === 'side' || (settingsStore.mode === 'mobile' && settingsStore.settings.menu.menuMode !== 'single')" class="main-sidebar-container">
      <Logo :show-title="false" class="sidebar-logo" />
      <!-- 侧边栏模式（含主导航） -->
      <div class="nav">
        <template v-for="(item, index) in menuStore.allMenus">
          <div
            v-if="item.children && item.children.length !== 0" :key="index" class="item" :class="{
              active: index === menuStore.actived,
            }" :title="item.meta?.title ?? '[ 无标题 ]'" @click="switchTo(index)"
          >
            <el-icon v-if="item.meta?.icon">
              <svg-icon :name="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta?.title ?? '[ 无标题 ]' }}</span>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.main-sidebar-container {
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;

  // firefox隐藏滚动条
  scrollbar-width: none;

  // chrome隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }

  position: relative;
  z-index: 1;
  width: var(--g-main-sidebar-width);
  color: var(--g-main-sidebar-menu-color);
  background-color: var(--g-main-sidebar-bg);
  transition: background-color 0.3s, var(--el-transition-color);

  .sidebar-logo {
    transition: 0.3s;
    background-color: var(--g-main-sidebar-bg);
  }

  .nav {
    width: inherit;
    padding-top: var(--g-sidebar-logo-height);

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      height: 60px;
      padding: 0 5px;
      cursor: pointer;
      color: var(--g-main-sidebar-menu-color);
      background-color: var(--g-main-sidebar-bg);
      transition: background-color 0.3s, var(--el-transition-color);

      &:hover {
        color: var(--g-main-sidebar-menu-hover-color);
        background-color: var(--g-main-sidebar-menu-hover-bg);
      }

      &.active {
        color: var(--g-main-sidebar-menu-active-color);
        background-color: var(--g-main-sidebar-menu-active-bg);
      }

      .el-icon {
        margin: 0 auto;
        font-size: 24px;
      }

      span {
        text-align: center;
        font-size: 14px;

        @include text-overflow(1, false);
      }
    }
  }
}

// 主侧边栏动画
.main-sidebar-enter-active,
.main-sidebar-leave-active {
  transition: transform 0.3s;
}

.main-sidebar-enter-from,
.main-sidebar-leave-to {
  transform: translateX(calc(var(--g-main-sidebar-width) * -1));
}
</style>
