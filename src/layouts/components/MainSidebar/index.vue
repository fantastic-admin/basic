<script setup lang="ts">
import Logo from '../Logo/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

defineOptions({
  name: 'MainSidebar',
})

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const { switchTo } = useMenu()
</script>

<template>
  <Transition name="main-sidebar">
    <div v-if="settingsStore.settings.menu.menuMode === 'side' || (settingsStore.mode === 'mobile' && settingsStore.settings.menu.menuMode !== 'single')" class="main-sidebar-container">
      <Logo :show-title="false" class="sidebar-logo" />
      <!-- 侧边栏模式（含主导航） -->
      <div class="menu flex flex-col of-hidden transition-all">
        <template v-for="(item, index) in menuStore.allMenus" :key="index">
          <div
            class="menu-item relative transition-all" :class="{
              active: index === menuStore.actived,
            }"
          >
            <div
              v-if="item.children && item.children.length !== 0" class="menu-item-container w-full h-full flex justify-between items-center gap-1 px-2! py-4 transition-all cursor-pointer group text-[var(--g-main-sidebar-menu-color)] hover:(text-[var(--g-main-sidebar-menu-hover-color)] bg-[var(--g-main-sidebar-menu-hover-bg)])" :class="{
                'text-[var(--g-main-sidebar-menu-active-color)]! bg-[var(--g-main-sidebar-menu-active-bg)]!': index === menuStore.actived,
              }" :title="item.meta?.title" @click="switchTo(index)"
            >
              <div class="inline-flex flex-col justify-center items-center flex-1 gap-[2px] w-full">
                <SvgIcon v-if="item.meta?.icon" :name="item.meta?.icon" :size="20" class="menu-item-container-icon transition-transform group-hover:scale-120" async />
                <span class="flex-1 text-sm w-full text-center truncate transition-width transition-height transition-opacity">
                  {{ item.meta?.title }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.main-sidebar-container {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  width: var(--g-main-sidebar-width);
  color: var(--g-main-sidebar-menu-color);
  background-color: var(--g-main-sidebar-bg);
  box-shadow: 1px 0 0 0 var(--g-border-color);
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

  .sidebar-logo {
    background-color: var(--g-main-sidebar-bg);
    transition: background-color 0.3s;
  }

  .menu {
    flex: 1;
    width: initial;
    overflow: hidden auto;
    overscroll-behavior: contain;

    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    :deep(.menu-item) {
      .menu-item-container {
        height: 60px;
        padding: 0 5px;
        color: var(--g-main-sidebar-menu-color);
        background-color: var(--g-main-sidebar-menu-bg);

        .menu-item-container-icon {
          transform: scale(1);
          font-size: 24px !important;
        }
      }

      &:hover .menu-item-container {
        color: var(--g-main-sidebar-menu-hover-color);
        background-color: var(--g-main-sidebar-menu-hover-bg);
      }

      &.active .menu-item-container {
        color: var(--g-main-sidebar-menu-active-color) !important;
        background-color: var(--g-main-sidebar-menu-active-bg) !important;
      }
    }
  }
}

// 主侧边栏动画
.main-sidebar-enter-active,
.main-sidebar-leave-active {
  transition: 0.3s;
}

.main-sidebar-enter-from,
.main-sidebar-leave-to {
  transform: translateX(calc(var(--g-main-sidebar-width) * -1));
}
</style>
