<script lang="ts" setup name="Header">
import Logo from '../Logo/index.vue'
import Tools from '../Tools/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const { switchTo } = useMenu()

const navRef = ref()

// 顶部模式鼠标滚动
function handlerMouserScroll(event: WheelEvent) {
  navRef.value.scrollBy({
    left: (event.deltaY || event.detail) > 0 ? 50 : -50,
  })
}
</script>

<template>
  <transition name="header">
    <header v-if="settingsStore.mode === 'pc' && settingsStore.settings.menu.menuMode === 'head'">
      <div class="header-container">
        <div class="main">
          <Logo />
          <!-- 顶部模式 -->
          <div ref="navRef" class="nav" @wheel.prevent="handlerMouserScroll">
            <template v-for="(item, index) in menuStore.allMenus" :key="index">
              <div v-if="item.children && item.children.length !== 0" class="item-container" :class="{ active: index === menuStore.actived }">
                <div class="item" @click="switchTo(index)">
                  <el-icon v-if="item.meta?.icon">
                    <svg-icon :name="item.meta.icon" />
                  </el-icon>
                  <span v-if="item.meta?.title">{{ item.meta.title }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
        <Tools />
      </div>
    </header>
  </transition>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: var(--g-header-height);
  color: var(--g-header-color);
  background-color: var(--g-header-bg);
  transition: background-color 0.3s, var(--el-transition-color);

  .header-container {
    width: var(--g-header-width);
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .main {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      height: 100%;
    }
  }

  @media screen and (max-width: var(--g-header-width)) {
    .header-container {
      width: 100%;
    }
  }

  :deep(.title) {
    position: relative;
    width: inherit;
    height: inherit;
    padding: inherit;
    background-color: inherit;

    .logo {
      width: 50px;
      height: 50px;
    }

    span {
      font-size: 24px;
      letter-spacing: 1px;
      color: var(--g-header-color);
    }
  }

  .nav {
    flex: 1;
    display: flex;
    width: 0;
    height: 100%;
    margin: 0 30px;
    padding: 0 20px;
    overflow-x: auto;
    mask-image: linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent);

    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    .item-container {
      position: relative;
      display: flex;
      width: initial;

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 5px;
        width: 80px;
        height: 100%;
        cursor: pointer;
        color: var(--g-header-menu-color);
        background-color: var(--g-header-bg);
        transition: background-color 0.3s, var(--el-transition-color);

        &:hover {
          color: var(--g-header-menu-hover-color);
          background-color: var(--g-header-menu-hover-bg);
        }

        .el-icon {
          font-size: 24px;
          vertical-align: middle;
        }

        span {
          text-align: center;
          vertical-align: middle;
          word-break: break-all;

          @include text-overflow(1, false);
        }
      }

      &.active .item {
        color: var(--g-header-menu-active-color);
        background-color: var(--g-header-menu-active-bg);
      }
    }
  }

  :deep(.tools) {
    padding: 0;

    .buttons .item .el-icon {
      color: var(--g-header-color);
    }

    .user-container {
      font-size: 16px;
      color: var(--g-header-color);
    }
  }
}

// 头部动画
.header-enter-active,
.header-leave-active {
  transition: transform 0.3s;
}

.header-enter-from,
.header-leave-to {
  transform: translateY(calc(var(--g-header-height) * -1));
}
</style>
