<script setup lang="ts">
import { useHotkeyBindings } from '@/hotkeys/useHotkeys'
import { useSlots } from '@/slots'
import Logo from '../Logo/index.vue'

defineOptions({
  name: 'MainSidebar',
})

defineProps<{
  enable: boolean
}>()

const appSettingsStore = useAppSettingsStore()
const appMenuStore = useAppMenuStore()

const { generateTitle, switchTo } = useAppMenu()

useHotkeyBindings({
  'menu.next': () => {
    switchTo(appMenuStore.actived + 1 < appMenuStore.allMenus.length ? appMenuStore.actived + 1 : 0)
  },
  'menu.prev': () => {
    switchTo(appMenuStore.actived - 1 >= 0 ? appMenuStore.actived - 1 : appMenuStore.allMenus.length - 1)
  },
})
</script>

<template>
  <Transition name="main-sidebar">
    <div v-if="enable" class="main-sidebar-container">
      <Component :is="useSlots('main-sidebar-top')" />
      <Logo :show-title="false" class="sidebar-logo" />
      <Component :is="useSlots('main-sidebar-after-logo')" />
      <FaScrollArea :scrollbar="false" mask gradient-color="var(--g-main-sidebar-bg)" class="menu overscroll-contain flex-1">
        <!-- 侧边栏模式（含主导航） -->
        <div
          v-if="appSettingsStore.settings.menu.mode === 'side' || (appSettingsStore.mode === 'mobile' && appSettingsStore.settings.menu.mode !== 'single')" class="py-1 flex flex-col w-full transition-all of-hidden -mt-2"
        >
          <template v-for="(item, index) in appMenuStore.allMenus" :key="index">
            <div
              class="menu-item px-2 py-1 transition-all relative" :class="{
                active: index === appMenuStore.actived,
              }"
            >
              <FaTooltip v-if="item.children && item.children.length !== 0" :disabled="!generateTitle(item.meta?.title)" :text="generateTitle(item.meta?.title)" side="right">
                <div
                  class="group menu-item-container text-[var(--g-main-sidebar-menu-color)] py-4 rounded-lg flex gap-1 h-full w-full cursor-pointer transition-colors items-center justify-between relative hover-(text-[var(--g-main-sidebar-menu-hover-color)] bg-[var(--g-main-sidebar-menu-hover-bg)]) px-2!" :class="{
                    'text-[var(--g-main-sidebar-menu-active-color)]! bg-[var(--g-main-sidebar-menu-active-bg)]!': index === appMenuStore.actived,
                  }" @click="switchTo(index)"
                >
                  <div class="inline-flex flex-1 flex-col gap-1 w-full items-center justify-center">
                    <FaIcon v-if="item.meta?.icon" :name="item.meta.icon" class="menu-item-container-icon transition-transform group-hover-scale-120" />
                    <span class="text-sm text-center flex-1 w-full truncate transition-height transition-opacity transition-width empty:hidden">
                      {{ generateTitle(item.meta?.title) }}
                    </span>
                  </div>
                </div>
              </FaTooltip>
            </div>
          </template>
        </div>
      </FaScrollArea>
      <Component :is="useSlots('main-sidebar-after-menu')" />
      <div class="px-4 py-3 flex-center">
        <AppAccountButton only-avatar :button-variant="appSettingsStore.settings.menu.mode === 'side' ? 'secondary' : 'ghost'" class="p-2 size-12" />
      </div>
      <Component :is="useSlots('main-sidebar-bottom')" />
    </div>
  </Transition>
</template>

<style scoped>
.main-sidebar-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: var(--g-main-sidebar-width);
  color: var(--g-main-sidebar-menu-color);
  background-color: var(--g-main-sidebar-bg);
  box-shadow: 1px 0 0 0 oklch(var(--border));
  transition: color 0.15s, background-color 0.15s, box-shadow 0.15s;

  .sidebar-logo {
    background-color: var(--g-main-sidebar-bg);
    transition: background-color 0.15s;
  }

  .menu {
    :deep(.menu-item) {
      .menu-item-container {
        aspect-ratio: 1 / 1;
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
