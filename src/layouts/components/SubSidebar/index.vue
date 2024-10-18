<script setup lang="ts">
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import { useElementSize } from '@vueuse/core'
import Logo from '../Logo/index.vue'
import Menu from '../Menu/index.vue'

defineOptions({
  name: 'SubSidebar',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const subSidebarRef = useTemplateRef('subSidebarRef')
const showShadowTop = ref(false)
const showShadowBottom = ref(false)
function onSidebarScroll() {
  const scrollTop = subSidebarRef.value?.scrollTop ?? 0
  showShadowTop.value = scrollTop > 0
  const clientHeight = subSidebarRef.value?.clientHeight ?? 0
  const scrollHeight = subSidebarRef.value?.scrollHeight ?? 0
  showShadowBottom.value = Math.ceil(scrollTop + clientHeight) < scrollHeight
}

const enableSidebar = computed(() => {
  return settingsStore.mode === 'mobile' || (
    menuStore.sidebarMenus.length !== 0
    && !menuStore.sidebarMenus.every(item => item.meta?.menu === false)
  )
})

watch(enableSidebar, (val) => {
  if (val) {
    nextTick(() => {
      onSidebarScroll()
    })
  }
}, {
  immediate: true,
})

const menuRef = useTemplateRef('menuRef')

onMounted(() => {
  if (enableSidebar.value) {
    const { height } = useElementSize(menuRef)
    watch(() => height.value, () => {
      if (height.value > 0) {
        onSidebarScroll()
      }
    }, {
      immediate: true,
    })
  }
})
</script>

<template>
  <div
    v-if="enableSidebar" class="sub-sidebar-container" :class="{
      'is-collapse': settingsStore.mode === 'pc' && settingsStore.settings.menu.subMenuCollapse,
    }"
  >
    <Logo
      :show-logo="settingsStore.settings.menu.mode === 'single'" class="sidebar-logo" :class="{
        'sidebar-logo-bg': settingsStore.settings.menu.mode === 'single',
      }"
    />
    <div
      ref="subSidebarRef" class="sub-sidebar flex-1 transition-shadow-300 scrollbar-none" :class="{
        'shadow-top': showShadowTop,
        'shadow-bottom': showShadowBottom,
      }" @scroll="onSidebarScroll"
    >
      <div ref="menuRef">
        <TransitionGroup name="sub-sidebar">
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
      </div>
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="relative flex items-center px-4 py-3" :class="[settingsStore.settings.menu.subMenuCollapse ? 'justify-center' : 'justify-end']">
      <span v-show="settingsStore.settings.menu.enableSubMenuCollapseButton" class="flex-center cursor-pointer rounded bg-stone-1 p-2 transition dark-bg-stone-9 hover-bg-stone-2 dark-hover-bg-stone-8" :class="{ '-rotate-z-180': settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()">
        <SvgIcon name="toolbar-collapse" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.sub-sidebar-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
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

    &.shadow-top {
      box-shadow: inset 0 10px 10px -10px var(--g-box-shadow-color), inset 0 0 0 transparent;
    }

    &.shadow-bottom {
      box-shadow: inset 0 0 0 transparent, inset 0 -10px 10px -10px var(--g-box-shadow-color);
    }

    &.shadow-top.shadow-bottom {
      box-shadow: inset 0 10px 10px -10px var(--g-box-shadow-color), inset 0 -10px 10px -10px var(--g-box-shadow-color);
    }
  }

  .menu {
    width: 100%;
  }
}

/* 次侧边栏动画 */
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
