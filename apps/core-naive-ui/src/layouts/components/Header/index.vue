<script setup lang="ts">
import { useSlots } from '@/slots'
import Logo from '../Logo/index.vue'

defineOptions({
  name: 'LayoutHeader',
})

defineProps<{
  enable: boolean
}>()

const appSettingsStore = useAppSettingsStore()
const appMenuStore = useAppMenuStore()

const { generateTitle, switchTo } = useAppMenu()
</script>

<template>
  <Transition name="header">
    <header v-if="enable">
      <div class="header-container">
        <Component :is="useSlots('header-start')" />
        <Logo class="title" />
        <Component :is="useSlots('header-after-logo')" />
        <FaScrollArea :scrollbar="false" mask horizontal class="menu-container overscroll-contain flex-1 h-full">
          <!-- 顶部模式 -->
          <div
            v-if="appSettingsStore.settings.menu.mode === 'head'" class="menu flex h-full transition-all of-hidden"
          >
            <template v-for="(item, index) in appMenuStore.allMenus" :key="index">
              <div
                class="menu-item mx-1 py-2 transition-all relative" :class="{
                  active: index === appMenuStore.actived,
                }"
              >
                <FaTooltip v-if="item.children && item.children.length !== 0" :disabled="!generateTitle(item.meta?.title)" :text="generateTitle(item.meta?.title)" side="bottom">
                  <div
                    class="group menu-item-container text-[var(--g-header-menu-color)] px-3 rounded-lg flex gap-1 h-full w-full cursor-pointer transition-colors items-center justify-between relative hover-(text-[var(--g-header-menu-hover-color)] bg-[var(--g-header-menu-hover-bg)])" :class="{
                      'text-[var(--g-header-menu-active-color)]! bg-[var(--g-header-menu-active-bg)]!': index === appMenuStore.actived,
                    }" @click="switchTo(index)"
                  >
                    <div class="inline-flex flex-1 gap-1 items-center justify-center">
                      <FaIcon v-if="item.meta?.icon" :name="item.meta.icon" class="menu-item-container-icon transition-transform group-hover-scale-120" />
                      <span class="text-sm flex-1 w-full truncate transition-height transition-opacity transition-width empty:hidden">
                        {{ generateTitle(item.meta?.title) }}
                      </span>
                    </div>
                  </div>
                </FaTooltip>
              </div>
            </template>
          </div>
        </FaScrollArea>
        <Component :is="useSlots('header-after-menu')" />
        <div class="flex-center">
          <AppAccountButton only-avatar dropdown-side="bottom" class="p-2 size-12" />
        </div>
        <Component :is="useSlots('header-end')" />
      </div>
    </header>
  </Transition>
</template>

<style scoped>
header {
  position: fixed;
  top: var(--g-slots-layout-top-height);
  right: var(--scrollbar-width, 0);
  left: 0;
  z-index: 1020;
  display: flex;
  align-items: center;
  width: calc(100% - var(--scrollbar-width, 0px));
  height: var(--g-header-height);
  margin: 0 auto;
  color: var(--g-header-color);
  background-color: var(--g-header-bg);
  box-shadow: inset 0 -1px 0 0 oklch(var(--border));
  transition: width 0.3s, background-color 0.15s, box-shadow 0.15s;

  .header-container {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: var(--g-header-width);
    height: 100%;
    padding: 0 12px;
    margin: 0 auto;

    :deep(a.title) {
      position: relative;
      flex: 0;
      width: inherit;
      height: inherit;
      padding: 0;
      background-color: inherit;

      .logo {
        width: initial;
        max-width: initial;
        height: min(70%, 50px);
      }

      span {
        font-size: 20px;
        color: var(--g-header-color);
        letter-spacing: 1px;
      }
    }

    .menu-container {
      .menu {
        display: inline-flex;

        :deep(.menu-item) {
          .menu-item-container {
            color: var(--g-header-menu-color);

            &:hover {
              color: var(--g-header-menu-hover-color);
              background-color: var(--g-header-menu-hover-bg);
            }

            .menu-item-container-icon {
              font-size: 20px !important;
            }
          }

          &.active .menu-item-container {
            color: var(--g-header-menu-active-color) !important;
            background-color: var(--g-header-menu-active-bg) !important;
          }
        }
      }
    }
  }
}

/* 头部动画 */
.header-enter-active,
.header-leave-active {
  transition: transform 0.3s;
}

.header-enter-from,
.header-leave-to {
  transform: translateY(calc(var(--g-header-height) * -1));
}
</style>
