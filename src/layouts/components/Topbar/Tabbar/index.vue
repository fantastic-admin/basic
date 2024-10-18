<script setup lang="ts">
import type { Tabbar } from '#/global'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'
import ContextMenu from '@imengyu/vue3-context-menu'
import { useMagicKeys } from '@vueuse/core'
import hotkeys from 'hotkeys-js'
import Message from 'vue-m-message'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

defineOptions({
  name: 'Tabbar',
})

const route = useRoute()
const router = useRouter()

const settingsStore = useSettingsStore()
const tabbarStore = useTabbarStore()

const tabbar = useTabbar()
const mainPage = useMainPage()

const keys = useMagicKeys({ reactive: true })

const activedTabId = computed(() => tabbar.getId())

const tabsRef = useTemplateRef('tabsRef')
const tabContainerRef = useTemplateRef('tabContainerRef')
const tabRef = useTemplateRef<HTMLElement[]>('tabRef')

watch(() => route, (val) => {
  if (settingsStore.settings.tabbar.enable) {
    tabbarStore.add(val).then(() => {
      const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
      if (index !== -1) {
        tabRef.value && scrollTo(tabRef.value[index].offsetLeft)
        tabbarScrollTip()
      }
    })
  }
}, {
  immediate: true,
  deep: true,
})
function tabbarScrollTip() {
  if (tabContainerRef.value?.$el.clientWidth > (tabsRef.value?.clientWidth ?? 0) && localStorage.getItem('tabbarScrollTip') === undefined) {
    localStorage.setItem('tabbarScrollTip', '')
    Message.info('标签栏数量超过展示区域范围，可以将鼠标移到标签栏上，通过鼠标滚轮滑动浏览', {
      title: '温馨提示',
      duration: 5000,
      closable: true,
      zIndex: 2000,
    })
  }
}
function handlerMouserScroll(event: WheelEvent) {
  tabsRef.value?.scrollBy({
    left: event.deltaY || event.detail,
  })
}
function scrollTo(offsetLeft: number) {
  tabsRef.value?.scrollTo({
    left: offsetLeft - 50,
    behavior: 'smooth',
  })
}
function onTabbarContextmenu(event: MouseEvent, routeItem: Tabbar.recordRaw) {
  event.preventDefault()
  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    zIndex: 1050,
    iconFontClass: '',
    customClass: 'tabbar-contextmenu',
    items: [
      {
        label: '重新加载',
        icon: 'i-ri:refresh-line',
        disabled: routeItem.tabId !== activedTabId.value,
        onClick: () => mainPage.reload(),
      },
      {
        label: '关闭标签页',
        icon: 'i-ri:close-line',
        disabled: tabbarStore.list.length <= 1,
        divided: true,
        onClick: () => {
          tabbar.closeById(routeItem.tabId)
        },
      },
      {
        label: '关闭其他标签页',
        disabled: !tabbar.checkCloseOtherSide(routeItem.tabId),
        onClick: () => {
          tabbar.closeOtherSide(routeItem.tabId)
        },
      },
      {
        label: '关闭左侧标签页',
        disabled: !tabbar.checkCloseLeftSide(routeItem.tabId),
        onClick: () => {
          tabbar.closeLeftSide(routeItem.tabId)
        },
      },
      {
        label: '关闭右侧标签页',
        disabled: !tabbar.checkCloseRightSide(routeItem.tabId),
        onClick: () => {
          tabbar.closeRightSide(routeItem.tabId)
        },
      },
    ],
  })
}

onMounted(() => {
  hotkeys('alt+left,alt+right,alt+w,alt+1,alt+2,alt+3,alt+4,alt+5,alt+6,alt+7,alt+8,alt+9,alt+0', (e, handle) => {
    if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.enableHotkeys) {
      e.preventDefault()
      switch (handle.key) {
        // 切换到当前标签页紧邻的上一个标签页
        case 'alt+left':
          if (tabbarStore.list[0].tabId !== activedTabId.value) {
            const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
            router.push(tabbarStore.list[index - 1].fullPath)
          }
          break
        // 切换到当前标签页紧邻的下一个标签页
        case 'alt+right':
          if (tabbarStore.list.at(-1)?.tabId !== activedTabId.value) {
            const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
            router.push(tabbarStore.list[index + 1].fullPath)
          }
          break
        // 关闭当前标签页
        case 'alt+w':
          tabbar.closeById(activedTabId.value)
          break
        // 切换到第 n 个标签页
        case 'alt+1':
        case 'alt+2':
        case 'alt+3':
        case 'alt+4':
        case 'alt+5':
        case 'alt+6':
        case 'alt+7':
        case 'alt+8':
        case 'alt+9':
        {
          const number = Number(handle.key.split('+')[1])
          tabbarStore.list[number - 1]?.fullPath && router.push(tabbarStore.list[number - 1].fullPath)
          break
        }
        // 切换到最后一个标签页
        case 'alt+0':
          router.push(tabbarStore.list[tabbarStore.list.length - 1].fullPath)
          break
      }
    }
  })
})
onUnmounted(() => {
  hotkeys.unbind('alt+left,alt+right,alt+w,alt+1,alt+2,alt+3,alt+4,alt+5,alt+6,alt+7,alt+8,alt+9,alt+0')
})
</script>

<template>
  <div class="tabbar-container">
    <div ref="tabsRef" class="tabs scrollbar-none" @wheel.prevent="handlerMouserScroll">
      <TransitionGroup ref="tabContainerRef" name="tabbar" tag="div" class="tab-container">
        <div
          v-for="(element, index) in tabbarStore.list" :key="element.tabId"
          ref="tabRef" :data-index="index" class="tab" :class="{
            actived: element.tabId === activedTabId,
          }" :title="typeof element?.title === 'function' ? element.title() : element.title" @click="router.push(element.fullPath)" @contextmenu="onTabbarContextmenu($event, element)"
        >
          <div class="tab-dividers" />
          <div class="tab-background" />
          <div class="tab-content">
            <div :key="element.tabId" class="title">
              <SvgIcon v-if="settingsStore.settings.tabbar.enableIcon && element.icon" :name="element.icon" class="icon" />
              {{ typeof element?.title === 'function' ? element.title() : element.title }}
            </div>
            <div v-if="tabbarStore.list.length > 1" class="action-icon" @click.stop="tabbar.closeById(element.tabId)">
              <SvgIcon name="i-ri:close-fill" />
            </div>
            <div v-show="keys.alt && index < 9" class="hotkey-number">
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
.tabbar-contextmenu {
  --uno: fixed ring-1 ring-stone-2 dark-ring-stone-7 shadow-2xl;

  background-color: var(--g-container-bg);

  .mx-context-menu-items .mx-context-menu-item {
    --uno: transition-background-color;

    &:not(.disabled):hover {
      --uno: cursor-pointer bg-stone-1 dark-bg-stone-9;
    }

    span {
      color: initial;
    }

    .icon {
      color: initial;
    }

    &.disabled span,
    &.disabled .icon {
      opacity: 0.25;
    }
  }

  .mx-context-menu-item-sperator {
    background-color: var(--g-container-bg);

    &::after {
      --uno: bg-stone-2 dark-bg-stone-7;
    }
  }
}
</style>

<style scoped>
.tabbar-container {
  position: relative;
  height: var(--g-tabbar-height);
  background-color: var(--g-bg);
  transition: background-color 0.3s;

  .tabs {
    position: absolute;
    right: 0;
    left: 0;
    overflow-y: hidden;
    white-space: nowrap;

    .tab-container {
      display: inline-block;

      .tab {
        position: relative;
        display: inline-block;
        width: 150px;
        height: var(--g-tabbar-height);
        font-size: 14px;
        line-height: calc(var(--g-tabbar-height) - 2px);
        vertical-align: bottom;
        pointer-events: none;
        cursor: pointer;

        &:not(.actived):hover {
          z-index: 3;

          &::before,
          &::after {
            content: none;
          }

          & + .tab .tab-dividers::before {
            opacity: 0;
          }

          .tab-content {
            .title,
            .action-icon {
              color: var(--g-tabbar-tab-hover-color);
            }
          }

          .tab-background {
            background-color: var(--g-tabbar-tab-hover-bg);
          }
        }

        * {
          user-select: none;
        }

        &.actived {
          z-index: 5;

          &::before,
          &::after {
            content: none;
          }

          & + .tab .tab-dividers::before {
            opacity: 0;
          }

          .tab-content {
            .title,
            .action-icon {
              color: var(--g-tabbar-tab-active-color);
            }
          }

          .tab-background {
            background-color: var(--g-container-bg);
          }
        }

        .tab-dividers {
          position: absolute;
          top: 50%;
          right: -1px;
          left: -1px;
          z-index: 0;
          height: 14px;
          transform: translateY(-50%);

          &::before {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 1px;
            display: block;
            width: 1px;
            content: "";
            background-color: var(--g-tabbar-dividers-bg);
            opacity: 1;
            transition: opacity 0.2s ease, background-color 0.3s;
          }
        }

        &:first-child .tab-dividers::before {
          opacity: 0;
        }

        .tab-background {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          transition: opacity 0.3s, background-color 0.3s;
        }

        .tab-content {
          display: flex;
          width: 100%;
          height: 100%;
          pointer-events: all;

          .title {
            display: flex;
            flex: 1;
            gap: 5px;
            align-items: center;
            height: 100%;
            padding: 0 10px;
            margin-right: 10px;
            overflow: hidden;
            color: var(--g-tabbar-tab-color);
            white-space: nowrap;
            mask-image: linear-gradient(to right, #000 calc(100% - 20px), transparent);
            transition: margin-right 0.3s;

            &:has(+ .action-icon) {
              margin-right: 28px;
            }

            .icon {
              flex-shrink: 0;
            }
          }

          .action-icon {
            position: absolute;
            top: 50%;
            right: 0.5em;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.5em;
            height: 1.5em;
            font-size: 12px;
            color: var(--g-tabbar-tab-color);
            border-radius: 50%;
            transform: translateY(-50%);

            &:hover {
              --uno: ring-1 ring-stone-3 dark-ring-stone-7;

              background-color: var(--g-bg);
            }
          }

          .hotkey-number {
            --uno: ring-1 ring-stone-3 dark-ring-stone-7;

            position: absolute;
            top: 50%;
            right: 0.5em;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.5em;
            height: 1.5em;
            font-size: 12px;
            color: var(--g-tabbar-tab-color);
            background-color: var(--g-bg);
            border-radius: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}

/* 标签栏动画 */
.tabs {
  .tabbar-move,
  .tabbar-enter-active,
  .tabbar-leave-active {
    transition: all 0.3s;
  }

  .tabbar-enter-from,
  .tabbar-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .tabbar-leave-active {
    position: absolute !important;
  }
}
</style>
