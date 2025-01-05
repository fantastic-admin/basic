<script setup lang="ts">
import { useSlots } from '@/slots'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import Logo from '../Logo/index.vue'
import Menu from '../Menu/index.vue'

defineOptions({
  name: 'SubSidebar',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const enableSidebar = computed(() => {
  return settingsStore.mode === 'mobile' || (
    menuStore.sidebarMenus.length !== 0
    && !menuStore.sidebarMenus.every(item => item.meta?.menu === false)
  )
})

const transitionName = ref('')
watch(() => menuStore.actived, (val, oldVal) => {
  if (settingsStore.mode === 'mobile' || settingsStore.settings.menu.mode === 'side') {
    if (val > oldVal) {
      transitionName.value = 'sub-sidebar-y-start'
    }
    else {
      transitionName.value = 'sub-sidebar-y-end'
    }
  }
  else if (settingsStore.settings.menu.mode === 'head') {
    if (val > oldVal) {
      transitionName.value = 'sub-sidebar-x-start'
    }
    else {
      transitionName.value = 'sub-sidebar-x-end'
    }
  }
})
</script>

<template>
  <div
    v-if="enableSidebar" class="sub-sidebar-container" :class="{
      'is-collapse': settingsStore.mode === 'pc' && settingsStore.settings.menu.subMenuCollapse,
    }"
  >
    <component :is="useSlots('sub-sidebar-top')" />
    <Logo
      v-if="['side', 'single'].includes(settingsStore.settings.menu.mode)" :show-logo="settingsStore.settings.menu.mode === 'single'" class="sidebar-logo" :class="{
        'sidebar-logo-bg': settingsStore.settings.menu.mode === 'single',
      }"
    />
    <component :is="useSlots('sub-sidebar-after-logo')" />
    <FaScrollArea :scrollbar="false" mask gradient-color="var(--g-sub-sidebar-bg)" class="flex-1">
      <TransitionGroup :name="transitionName">
        <template v-for="(mainItem, mainIndex) in menuStore.allMenus" :key="mainIndex">
          <div v-show="mainIndex === menuStore.actived">
            <Menu
              :menu="mainItem.children" :value="route.meta.activeMenu || route.path" :default-openeds="menuStore.defaultOpenedPaths" :accordion="settingsStore.settings.menu.subMenuUniqueOpened" :collapse="settingsStore.mode === 'pc' && settingsStore.settings.menu.subMenuCollapse" class="menu" :class="{
                '-mt-2': !['head', 'single'].includes(settingsStore.settings.menu.mode),
              }"
            />
          </div>
        </template>
      </TransitionGroup>
    </FaScrollArea>
    <div v-if="settingsStore.mode === 'pc'" class="relative flex items-center px-4 py-3" :class="[settingsStore.settings.menu.subMenuCollapse ? 'justify-center' : 'justify-end']">
      <FaButton v-show="settingsStore.settings.menu.enableSubMenuCollapseButton" variant="secondary" size="icon" class="h-8 w-8 transition" :class="{ '-rotate-z-180': settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()">
        <FaIcon name="toolbar-collapse" :size="16" />
      </FaButton>
    </div>
    <component :is="useSlots('sub-sidebar-bottom')" />
  </div>
</template>

<style scoped>
.sub-sidebar-container {
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: var(--g-sub-sidebar-width);
  background-color: var(--g-sub-sidebar-bg);
  box-shadow: -1px 0 0 0 hsl(var(--border)), 1px 0 0 0 hsl(var(--border));
  transition: background-color 0.3s, inset-inline-start 0.3s, width 0.3s, box-shadow 0.3s;

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

  .menu {
    width: 100%;
  }
}

/* 次侧边栏动画 */
.sub-sidebar-x-start-enter-active,
.sub-sidebar-x-end-enter-active,
.sub-sidebar-y-start-enter-active,
.sub-sidebar-y-end-enter-active {
  transition: 0.2s;
}

.sub-sidebar-x-start-enter-from,
.sub-sidebar-x-start-leave-active {
  opacity: 0;
  transform: translateX(30px);
}

.sub-sidebar-x-end-enter-from,
.sub-sidebar-x-end-leave-active {
  opacity: 0;
  transform: translateX(-30px);
}

.sub-sidebar-y-start-enter-from,
.sub-sidebar-y-start-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

.sub-sidebar-y-end-enter-from,
.sub-sidebar-y-end-leave-active {
  opacity: 0;
  transform: translateY(-30px);
}

.sub-sidebar-x-start-leave-active,
.sub-sidebar-x-end-leave-active,
.sub-sidebar-y-start-leave-active,
.sub-sidebar-y-end-leave-active {
  position: absolute;
}
</style>
