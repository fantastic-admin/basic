<script setup lang="ts">
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import Logo from '../Logo/index.vue'

defineOptions({
  name: 'MainSidebar',
})

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const { switchTo } = useMenu()
</script>

<template>
  <Transition name="main-sidebar">
    <div v-if="settingsStore.settings.menu.mode === 'side' || (settingsStore.mode === 'mobile' && settingsStore.settings.menu.mode !== 'single')" class="main-sidebar-container">
      <Logo :show-title="false" class="sidebar-logo" />
      <div class="menu scrollbar-none">
        <!-- 侧边栏模式（含主导航） -->
        <div class="w-full flex flex-col of-hidden py-1 transition-all -mt-2">
          <template v-for="(item, index) in menuStore.allMenus" :key="index">
            <div
              class="menu-item relative px-2 py-1 transition-all" :class="{
                active: index === menuStore.actived,
              }"
            >
              <div
                v-if="item.children && item.children.length !== 0" class="group menu-item-container h-full w-full flex cursor-pointer items-center justify-between gap-1 py-4 text-[var(--g-main-sidebar-menu-color)] transition-all hover-(bg-[var(--g-main-sidebar-menu-hover-bg)] text-[var(--g-main-sidebar-menu-hover-color)]) px-2!" :class="{
                  'text-[var(--g-main-sidebar-menu-active-color)]! bg-[var(--g-main-sidebar-menu-active-bg)]!': index === menuStore.actived,
                }" :title="typeof item.meta?.title === 'function' ? item.meta?.title() : item.meta?.title" @click="switchTo(index)"
              >
                <div class="w-full inline-flex flex-1 flex-col items-center justify-center gap-[2px]">
                  <SvgIcon v-if="item.meta?.icon" :name="item.meta?.icon" class="menu-item-container-icon transition-transform group-hover-scale-120" />
                  <span class="w-full flex-1 truncate text-center text-sm transition-height transition-opacity transition-width">
                    {{ typeof item.meta?.title === 'function' ? item.meta?.title() : item.meta?.title }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.main-sidebar-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
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

    :deep(.menu-item) {
      .menu-item-container {
        padding-block: 8px;
        color: var(--g-main-sidebar-menu-color);

        &:hover {
          color: var(--g-main-sidebar-menu-hover-color);
          background-color: var(--g-main-sidebar-menu-hover-bg);
        }

        .menu-item-container-icon {
          font-size: 20px !important;
        }
      }

      &.active .menu-item-container {
        color: var(--g-main-sidebar-menu-active-color) !important;
        background-color: var(--g-main-sidebar-menu-active-bg) !important;
      }
    }
  }
}

/* 主侧边栏动画 */
.main-sidebar-enter-active,
.main-sidebar-leave-active {
  transition: 0.3s;
}

.main-sidebar-enter-from,
.main-sidebar-leave-to {
  transform: translateX(calc(var(--g-main-sidebar-width) * -1));
}
</style>
