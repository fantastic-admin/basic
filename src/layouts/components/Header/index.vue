<script setup lang="ts">
import Logo from '../Logo/index.vue'
import Tools from '../Tools/index.vue'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'LayoutHeader',
})

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const { switchTo } = useMenu()

const menuRef = ref()

// 顶部模式鼠标滚动
function handlerMouserScroll(event: WheelEvent) {
  menuRef.value.scrollBy({
    left: (event.deltaY || event.detail) > 0 ? 50 : -50,
  })
}
</script>

<template>
  <Transition name="header">
    <header v-if="settingsStore.mode === 'pc' && settingsStore.settings.menu.menuMode === 'head'">
      <div class="header-container">
        <div class="main">
          <Logo class="title" />
          <div ref="menuRef" class="menu-container" @wheel.prevent="handlerMouserScroll">
            <!-- 顶部模式 -->
            <div class="menu flex of-hidden transition-all">
              <template v-for="(item, index) in menuStore.allMenus" :key="index">
                <div
                  class="menu-item relative transition-all" :class="{
                    active: index === menuStore.actived,
                  }"
                >
                  <div
                    v-if="item.children && item.children.length !== 0" class="menu-item-container w-full h-full flex justify-between items-center gap-1 px-5 py-4 transition-all cursor-pointer group text-[var(--g-header-menu-color)] hover:(text-[var(--g-header-menu-hover-color)] bg-[var(--g-header-menu-hover-bg)])" :class="{
                      'text-[var(--g-header-menu-active-color)]! bg-[var(--g-header-menu-active-bg)]!': index === menuStore.actived,
                    }" :title="item.meta?.title" @click="switchTo(index)"
                  >
                    <div class="inline-flex flex-col justify-center items-center flex-1">
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
        </div>
        <Tools />
      </div>
    </header>
  </Transition>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  height: var(--g-header-height);
  color: var(--g-header-color);
  background-color: var(--g-header-bg);
  box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color), 0 1px 0 0 var(--g-border-color);
  transition: background-color 0.3s;

  .header-container {
    width: 100%;
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

  :deep(a.title) {
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

  .menu-container {
    flex: 1;
    margin: 0 30px;
    padding: 0 20px;
    height: 100%;
    overflow-x: auto;
    mask-image: linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent);

    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .menu {
    display: inline-flex;
    height: 100%;
    background-color: var(--g-header-bg);

    :deep(.menu-item) {
      .menu-item-container {
        width: 80px;
        padding: 0 5px;
        color: var(--g-header-menu-color);
        background-color: var(--g-header-menu-bg);

        &:hover {
          color: var(--g-header-menu-hover-color);
          background-color: var(--g-header-menu-hover-bg);
        }

        .menu-item-container-icon {
          transform: scale(1);
          font-size: 24px !important;
        }
      }

      &.active .menu-item-container {
        color: var(--g-header-menu-active-color);
        background-color: var(--g-header-menu-active-bg);
      }
    }
  }

  :deep(.tools) {
    padding: 0;

    .buttons .item .icon {
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
