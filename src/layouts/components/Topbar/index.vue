<script lang="ts" setup name="Topbar">
import { compile } from 'path-to-regexp'
import Tools from '../Tools/index.vue'
import useSettingsStore from '@/store/modules/settings'

const route = useRoute()

const settingsStore = useSettingsStore()

const enableSubMenuCollapseButton = computed(() => {
  return settingsStore.mode === 'mobile' || (
    ['side', 'head', 'single'].includes(settingsStore.settings.menu.menuMode)
      && settingsStore.settings.menu.enableSubMenuCollapseButton
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
    breadcrumbList.push(...route.meta.breadcrumbNeste.filter(item => item.hide === false))
  }
  return breadcrumbList
})

const scrollTop = ref(0)
const scrollOnHide = ref(false)
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
function onScroll() {
  scrollTop.value = (document.documentElement || document.body).scrollTop
}
watch(scrollTop, (val, oldVal) => {
  const topbarHeight = parseInt(getComputedStyle(document.documentElement || document.body).getPropertyValue('--g-topbar-height'))
  scrollOnHide.value = settingsStore.settings.topbar.mode === 'sticky' && val > oldVal && val > topbarHeight
})

function pathCompile(path: string) {
  const toPath = compile(path)
  return toPath(route.params)
}
</script>

<template>
  <div
    class="topbar-container" :class="{
      [`topbar-${settingsStore.settings.topbar.mode}`]: true,
      shadow: scrollTop,
      hide: scrollOnHide,
    }" data-fixed-calc-width
  >
    <div class="left-box">
      <div v-if="enableSubMenuCollapseButton" class="sidebar-collapse" :class="{ 'is-collapse': settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()">
        <el-icon>
          <svg-icon name="toolbar-collapse" />
        </el-icon>
      </div>
      <el-breadcrumb v-if="settingsStore.settings.breadcrumb.enable && settingsStore.mode === 'pc' && settingsStore.settings.app.routeBaseOn !== 'filesystem'">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path" :to="index < breadcrumbList.length - 1 ? pathCompile(item.path) : ''">
            {{ item.title ?? '[ 无标题 ]' }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <Tools />
  </div>
</template>

<style lang="scss" scoped>
.topbar-container {
  position: absolute;
  z-index: 999;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--g-topbar-height);
  background-color: var(--g-toolbar-bg);
  transition: width 0.3s, top 0.3s, transform 0.3s, background-color 0.3s, var(--el-transition-box-shadow);

  &.topbar-fixed,
  &.topbar-sticky {
    position: fixed;

    &.shadow {
      box-shadow: 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }

  &.topbar-sticky.hide {
    top: calc(var(--g-topbar-height) * -1) !important;
  }

  .left-box {
    display: flex;
    align-items: center;
    padding-right: 50px;
    overflow: hidden;
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);

    .sidebar-collapse {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 50px;
      cursor: pointer;

      .el-icon {
        color: var(--el-text-color-primary);
        transition: var(--el-transition-color), var(--el-transition-md-fade);
      }

      &:hover .el-icon {
        color: var(--el-color-primary);
      }

      &.is-collapse .el-icon {
        transform: rotateZ(-180deg);
      }

      & + .el-breadcrumb {
        margin-left: 0;
      }
    }

    :deep(.el-breadcrumb) {
      margin-left: 20px;
      white-space: nowrap;

      .el-breadcrumb__item {
        display: inline-block;
        float: none;

        span {
          font-weight: normal;
        }

        &:last-child span {
          color: #97a8be;
        }
      }
    }
  }
}

// 面包屑动画
.breadcrumb-enter-active {
  transition: all 0.25s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>
