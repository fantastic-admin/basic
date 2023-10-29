<script setup lang="ts">
import { compile } from 'path-to-regexp'
import Breadcrumb from '../../Breadcrumb/index.vue'
import BreadcrumbItem from '../../Breadcrumb/item.vue'
import Tools from '../../Tools/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

defineOptions({
  name: 'Toolbar',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const enableSubMenuCollapseButton = computed(() => {
  return settingsStore.mode === 'mobile' || (
    ['side', 'head', 'single'].includes(settingsStore.settings.menu.menuMode)
      && settingsStore.settings.menu.enableSubMenuCollapseButton
      && !(
        !menuStore.sidebarMenus[0].children
          || menuStore.sidebarMenus[0]?.children.every(item => item.meta?.sidebar === false)
      )
  )
})

const breadcrumbList = computed(() => {
  const breadcrumbList = []
  if (settingsStore.settings.home.enable) {
    breadcrumbList.push({
      path: '/',
      title: settingsStore.settings.home.title,
    })
  }
  if (route.meta.breadcrumbNeste) {
    route.meta.breadcrumbNeste.forEach((item) => {
      if (item.hide === false) {
        breadcrumbList.push({
          path: item.path,
          title: item.title,
        })
      }
    })
  }
  return breadcrumbList
})

function pathCompile(path: string) {
  const toPath = compile(path)
  return toPath(route.params)
}
</script>

<template>
  <div class="toolbar-container">
    <div class="left-box">
      <div v-if="enableSubMenuCollapseButton" class="flex-center px-2 py-1 cursor-pointer transition-transform" :class="{ '-rotate-z-180': settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()">
        <SvgIcon name="toolbar-collapse" class="icon" />
      </div>
      <Breadcrumb v-if="settingsStore.mode === 'pc' && settingsStore.settings.breadcrumb.enable && settingsStore.settings.app.routeBaseOn !== 'filesystem'" class="breadcrumb">
        <TransitionGroup name="breadcrumb">
          <BreadcrumbItem v-for="(item, index) in breadcrumbList" :key="`${index}_${item.path}_${item.title}`" :to="index < breadcrumbList.length - 1 && item.path !== '' ? pathCompile(item.path) : ''">
            {{ item.title }}
          </BreadcrumbItem>
        </TransitionGroup>
      </Breadcrumb>
    </div>
    <Tools />
  </div>
</template>

<style lang="scss" scoped>
.toolbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--g-toolbar-height);
  background-color: var(--g-container-bg);
  transition: background-color 0.3s;

  .left-box {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 50px;
    overflow: hidden;
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);

    .breadcrumb {
      padding-left: 10px;
      white-space: nowrap;
    }
  }
}

// 面包屑动画
.breadcrumb-enter-active {
  transition: transform 0.3s, opacity 0.3s;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>
