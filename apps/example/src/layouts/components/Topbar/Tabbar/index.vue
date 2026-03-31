<script setup lang="ts">
import type { TabbarRecordRaw } from '@fantastic-admin/types'
import { useMagicKeys } from '@vueuse/core'
import { useHotkeyBindings } from '@/hotkeys/useHotkeys'
import { useSlots } from '@/slots'

defineOptions({
  name: 'Tabbar',
})

const route = useRoute()
const router = useRouter()

const appSettingsStore = useAppSettingsStore()
const appTabbarStore = useAppTabbarStore()

const tabbar = useAppTabbar()
const mainPage = useAppPage()

const keys = useMagicKeys({ reactive: true })

const { generateTitle } = useAppMenu()

const activedTabId = computed(() => tabbar.getId())

const tabsRef = useTemplateRef('tabsRef')
const tabContainerRef = useTemplateRef('tabContainerRef')
const tabRef = useTemplateRef<HTMLElement[]>('tabRef')

const isAnimating = ref(false)
const isInit = ref(true)

function onBeforeLeave(el: Element) {
  isAnimating.value = true
  const htmlEl = el as HTMLElement
  htmlEl.style.left = `${htmlEl.offsetLeft}px`
  htmlEl.style.top = `${htmlEl.offsetTop}px`
  htmlEl.style.width = `${htmlEl.offsetWidth}px`
}
onMounted(() => {
  nextTick(() => {
    isInit.value = false
  })
})

watch(() => route, (val) => {
  if (appSettingsStore.settings.topbar.tabbar) {
    appTabbarStore.add(val)
    nextTick(() => {
      const index = appTabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
      if (index !== -1) {
        const tabEl = tabRef.value?.find(item => Number.parseInt(item.dataset.index!) === index)
        const containerEl = tabsRef.value?.ref?.$el
        if (tabEl && containerEl) {
          const tabLeft = tabEl.offsetLeft
          const tabWidth = tabEl.offsetWidth
          const containerWidth = containerEl.clientWidth
          // 计算滚动位置，使标签页居中
          const scrollLeft = tabLeft - (containerWidth - tabWidth) / 2
          // 首次加载时直接定位到指定位置
          tabsRef.value?.scrollTo(scrollLeft, !isInit.value ? 'smooth' : undefined)
        }
        tabbarScrollTip()
      }
    })
  }
}, {
  immediate: true,
  deep: true,
})

function tabbarScrollTip() {
  if (tabContainerRef.value?.$el.clientWidth > (tabsRef.value?.ref?.$el.clientWidth ?? 0) && !localStorage.has('tabbarScrollTip')) {
    localStorage.setItem('tabbarScrollTip', '')
    const tips = faToast.info('温馨提示', {
      description: '标签栏数量超过展示区域范围，可以将鼠标移到标签栏上，通过鼠标滚轮滑动浏览',
      position: 'top-center',
      duration: Infinity,
      action: {
        label: '知道了',
        onClick: () => faToast.dismiss(tips),
      },
    })
  }
}
function contextMenuItems(routeItem: TabbarRecordRaw) {
  return [
    [
      {
        label: '重新加载',
        icon: 'i-ri:refresh-line',
        disabled: routeItem.tabId !== activedTabId.value,
        handle: () => mainPage.reload(),
      },
      {
        label: '关闭标签页',
        icon: 'i-ri:close-line',
        disabled: !tabbar.checkClose(routeItem.tabId),
        handle: () => tabbar.closeById(routeItem.tabId),
      },
    ],
    [
      {
        label: '关闭其它标签页',
        icon: 'i-mdi:close',
        disabled: !tabbar.checkCloseOtherSide(routeItem.tabId),
        handle: () => {
          tabbar.closeOtherSide(routeItem.tabId)
        },
      },
      {
        label: '关闭左侧标签页',
        icon: 'i-mdi:arrow-expand-left',
        disabled: !tabbar.checkCloseLeftSide(routeItem.tabId),
        handle: () => {
          tabbar.closeLeftSide(routeItem.tabId)
        },
      },
      {
        label: '关闭右侧标签页',
        icon: 'i-mdi:arrow-expand-right',
        disabled: !tabbar.checkCloseRightSide(routeItem.tabId),
        handle: () => {
          tabbar.closeRightSide(routeItem.tabId)
        },
      },
    ],
  ]
}

function iconName(icon: TabbarRecordRaw['icon']) {
  return icon
}

const visibleTabIndex = ref<number[]>([])
function getVisibleTabs() {
  const containerWidth = tabsRef.value?.ref?.$el.clientWidth ?? 0
  const scrollLeft = tabsRef.value?.ref?.el?.viewportElement?.scrollLeft ?? 0
  visibleTabIndex.value = []
  if (tabRef.value) {
    for (let i = 0; i < tabRef.value.length; i++) {
      const tab = tabRef.value[i]
      const tabLeft = tab.offsetLeft
      const tabRight = tabLeft + tab.offsetWidth
      // 检查标签页是否在可视区域内
      if (tabLeft < scrollLeft + containerWidth && tabRight > scrollLeft) {
        if (i >= 0 && i < appTabbarStore.list.length) {
          visibleTabIndex.value.push(i)
        }
      }
    }
  }
}
function getVisibleTabIndex(arrayIndex: number) {
  return visibleTabIndex.value.findIndex(visibleTab => visibleTab === arrayIndex) ?? -1
}

useHotkeyBindings({
  'tabbar.prev': () => {
    if (appTabbarStore.list[0]?.tabId !== activedTabId.value) {
      const index = appTabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
      index > 0 && router.push(appTabbarStore.list[index - 1].fullPath)
    }
  },
  'tabbar.next': () => {
    if (appTabbarStore.list.at(-1)?.tabId !== activedTabId.value) {
      const index = appTabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
      index >= 0 && router.push(appTabbarStore.list[index + 1].fullPath)
    }
  },
  'tabbar.closeCurrent': () => {
    tabbar.closeById(activedTabId.value)
  },
  'tabbar.gotoVisibleIndex': ({ hotkey }) => {
    const number = Number(hotkey.split('+')[1])
    if (visibleTabIndex.value[number - 1] !== undefined) {
      router.push(appTabbarStore.list[visibleTabIndex.value[number - 1]].fullPath)
    }
  },
  'tabbar.gotoLast': () => {
    const last = appTabbarStore.list.at(-1)
    last && router.push(last.fullPath)
  },
})

watch(() => keys.alt, (val) => {
  if (val) {
    getVisibleTabs()
  }
})
</script>

<template>
  <div class="tabbar">
    <Component :is="useSlots('tabbar-start')" />
    <div class="tabbar-container">
      <FaScrollArea
        ref="tabsRef" :scrollbar="false" mask horizontal class="tabs overscroll-contain"
      >
        <TransitionGroup ref="tabContainerRef" :name="!isInit ? 'tabbar' : undefined" tag="div" class="tab-container" @before-leave="onBeforeLeave" @after-leave="isAnimating = false">
          <div
            v-for="(element, index) in appTabbarStore.list" :key="element.tabId"
            ref="tabRef" :data-index="index" class="tab" :class="{
              actived: element.tabId === activedTabId,
            }" @click="!isAnimating && element.tabId !== activedTabId && router.push(element.fullPath)"
          >
            <FaContextMenu :items="contextMenuItems(element)">
              <div class="size-full">
                <div class="tab-dividers" />
                <div class="tab-background" />
                <FaTooltip :delay="1000" side="bottom">
                  <div class="tab-content">
                    <div :key="element.tabId" class="title">
                      <FaIcon v-if="appSettingsStore.settings.tabbar.icon && iconName(element.icon)" :name="iconName(element.icon)!" class="icon" />
                      {{ generateTitle(element.title) }}
                    </div>
                    <div v-if="appTabbarStore.list.length > 1" class="action-icon" @click.stop="tabbar.closeById(element.tabId)">
                      <FaIcon name="i-ri:close-fill" />
                    </div>
                    <div v-show="appSettingsStore.settings.tabbar.hotkeys && keys.alt && getVisibleTabIndex(index) >= 0 && getVisibleTabIndex(index) < 9" class="hotkey-number">
                      {{ getVisibleTabIndex(index) + 1 }}
                    </div>
                  </div>
                  <template #content>
                    <div class="text-sm">
                      {{ generateTitle(element.title) }}
                    </div>
                    <div class="text-accent/50">
                      {{ element.fullPath }}
                    </div>
                  </template>
                </FaTooltip>
              </div>
            </FaContextMenu>
          </div>
        </TransitionGroup>
      </FaScrollArea>
    </div>
    <Component :is="useSlots('tabbar-end')" />
  </div>
</template>

<style scoped>
.tabbar {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--g-tabbar-height);
  background-color: var(--g-tabbar-bg);
  box-shadow: 0 1px 0 0 oklch(var(--border)), 0 -1px 0 0 oklch(var(--border));

  .tabbar-container {
    display: flex;
    flex: 1;
    min-width: 0;
    height: 100%;

    .tabs {
      flex: 1;
      align-items: end;
      white-space: nowrap;

      .tab-container {
        position: relative;

        .tab {
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
        }

        .tab {
          position: relative;
          display: inline-block;
          min-width: 150px;
          max-width: 150px;
          height: var(--g-tabbar-height);
          font-size: 14px;
          line-height: calc(var(--g-tabbar-height) - 2px);
          vertical-align: bottom;
          pointer-events: none;
          cursor: pointer;

          * {
            user-select: none;
          }

          & + .tab:hover,
          & + .tab.actived {
            .tab-dividers::before {
              opacity: 0;
            }
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
              background-color: var(--g-tabbar-tab-active-bg);
            }
          }

          .tab-dividers {
            position: absolute;
            inset-inline: -1px;
            top: 50%;
            z-index: 0;
            height: 14px;
            transform: translateY(-50%);

            &::before {
              position: absolute;
              inset-inline-start: 1px;
              top: 0;
              bottom: 0;
              display: block;
              width: 1px;
              content: "";
              background-color: oklch(var(--border));
              opacity: 1;
              transition: opacity 0.3s, background-color 0.15s;
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
            transition: background-color 0.15s;
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
              margin-inline-end: 10px;
              overflow: hidden;
              color: var(--g-tabbar-tab-color);
              white-space: nowrap;
              mask-image: linear-gradient(to right, #000 calc(100% - 20px), transparent);
              transition: margin-inline-end 0.3s;

              &:has(+ .action-icon) {
                margin-inline-end: 28px;
              }

              .icon {
                flex-shrink: 0;
              }
            }

            .action-icon {
              --uno: transition absolute inset-e-2 top-1/2 -translate-y-1/2 rounded-full z-10 w-5 h-5 flex-center text-xs "text-[var(--g-tabbar-tab-color)]" hover:(border bg-secondary);
            }

            .hotkey-number {
              --uno: border bg-secondary absolute inset-e-2 top-1/2 -translate-y-1/2 rounded-full z-10 w-5 h-5 flex-center text-xs "text-[var(--g-tabbar-tab-color)]";
            }
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
