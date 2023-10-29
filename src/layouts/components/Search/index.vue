<script setup lang="ts">
import { Dialog, DialogDescription, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { cloneDeep } from 'lodash-es'
import hotkeys from 'hotkeys-js'
import type { RouteRecordRaw } from 'vue-router'
import Breadcrumb from '../Breadcrumb/index.vue'
import BreadcrumbItem from '../Breadcrumb/item.vue'
import { resolveRoutePath } from '@/utils'
import eventBus from '@/utils/eventBus'
import useSettingsStore from '@/store/modules/settings'
import useRouteStore from '@/store/modules/route'
import useMenuStore from '@/store/modules/menu'
import type { Menu } from '@/types/global'

defineOptions({
  name: 'Search',
})

const overlayTransitionClass = ref({
  enter: 'ease-in-out duration-500',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'ease-in-out duration-500',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
})

const transitionClass = computed(() => {
  return {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
    enterTo: 'opacity-100 translate-y-0 sm:scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
    leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
  }
})

const router = useRouter()
const settingsStore = useSettingsStore()
const routeStore = useRouteStore()
const menuStore = useMenuStore()

interface listTypes {
  path: string
  icon?: string
  title?: string | (() => string)
  link?: string
  breadcrumb: any[]
}

const isShow = ref(false)
const searchInput = ref('')
const sourceList = ref<listTypes[]>([])
const actived = ref(-1)
const isScrollbarsInit = ref(false)

const searchInputRef = ref()
const searchResultRef = ref<OverlayScrollbarsComponentRef>()
const searchResultItemRef = ref<HTMLElement[]>([])
onBeforeUpdate(() => {
  searchResultItemRef.value = []
})

const resultList = computed(() => {
  let result = []
  result = sourceList.value.filter((item) => {
    let flag = false
    if (item.title) {
      if (typeof item.title === 'function') {
        if (item.title().includes(searchInput.value)) {
          flag = true
        }
      }
      else {
        if (item.title.includes(searchInput.value)) {
          flag = true
        }
      }
    }
    if (item.path.includes(searchInput.value)) {
      flag = true
    }
    if (item.breadcrumb.some((b: { title: any }) => b.title.includes(searchInput.value))) {
      flag = true
    }
    return flag
  })
  return result
})

watch(() => isShow.value, (val) => {
  if (val) {
    searchInput.value = ''
    actived.value = -1
    // 当搜索显示的时候绑定上、下、回车快捷键，隐藏的时候再解绑。另外当 input 处于 focus 状态时，采用 vue 来绑定键盘事件
    hotkeys('up', keyUp)
    hotkeys('down', keyDown)
    hotkeys('enter', keyEnter)
  }
  else {
    hotkeys.unbind('up', keyUp)
    hotkeys.unbind('down', keyDown)
    hotkeys.unbind('enter', keyEnter)
  }
})
watch(() => resultList.value, () => {
  actived.value = -1
  handleScroll()
})

onMounted(() => {
  eventBus.on('global-search-toggle', () => {
    if (!isShow.value) {
      initSourceList()
    }
    isShow.value = !isShow.value
  })
  hotkeys('alt+s', (e) => {
    if (settingsStore.settings.navSearch.enable && settingsStore.settings.navSearch.enableHotkeys) {
      e.preventDefault()
      initSourceList()
      isShow.value = true
    }
  })
  hotkeys('esc', (e) => {
    if (settingsStore.settings.navSearch.enable && settingsStore.settings.navSearch.enableHotkeys) {
      e.preventDefault()
      isShow.value = false
    }
  })
  initSourceList()
})

function initSourceList() {
  sourceList.value = []
  if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
    routeStore.routes.forEach((item) => {
      item.children && getSourceList(item.children as RouteRecordRaw[])
    })
  }
  else {
    menuStore.menus.forEach((item) => {
      getSourceListByMenus(item.children)
    })
  }
}

function hasChildren(item: RouteRecordRaw) {
  let flag = true
  if (item.children?.every(i => i.meta?.sidebar === false)) {
    flag = false
  }
  return flag
}
function getSourceList(arr: RouteRecordRaw[], basePath?: string, icon?: string, breadcrumb?: { title?: string | (() => string) }[]) {
  arr.forEach((item) => {
    if (item.meta?.sidebar !== false) {
      const breadcrumbTemp = cloneDeep(breadcrumb) || []
      if (item.children && hasChildren(item)) {
        breadcrumbTemp.push({
          title: item.meta?.title,
        })
        getSourceList(item.children, resolveRoutePath(basePath, item.path), item.meta?.icon ?? icon, breadcrumbTemp)
      }
      else {
        breadcrumbTemp.push({
          title: item.meta?.title,
        })
        sourceList.value.push({
          path: resolveRoutePath(basePath, item.path),
          icon: item.meta?.icon ?? icon,
          title: item.meta?.title,
          link: item.meta?.link,
          breadcrumb: breadcrumbTemp,
        })
      }
    }
  })
}
function getSourceListByMenus(arr: Menu.recordRaw[], icon?: string, breadcrumb?: { title?: string | (() => string) }[]) {
  arr.forEach((item) => {
    const breadcrumbTemp = cloneDeep(breadcrumb) || []
    if (item.children && item.children.length > 0) {
      breadcrumbTemp.push({
        title: item.meta?.title,
      })
      getSourceListByMenus(item.children, item.meta?.icon ?? icon, breadcrumbTemp)
    }
    else {
      breadcrumbTemp.push({
        title: item.meta?.title,
      })
      sourceList.value.push({
        icon: item.meta?.icon ?? icon,
        title: item.meta?.title,
        path: item.path as string,
        breadcrumb: breadcrumbTemp,
      })
    }
  })
}

function keyUp() {
  if (resultList.value.length) {
    actived.value -= 1
    if (actived.value < 0) {
      actived.value = resultList.value.length - 1
    }
    handleScroll()
  }
}
function keyDown() {
  if (resultList.value.length) {
    actived.value += 1
    if (actived.value > resultList.value.length - 1) {
      actived.value = 0
    }
    handleScroll()
  }
}
function keyEnter() {
  if (actived.value !== -1) {
    searchResultItemRef.value.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.click()
  }
}
// FIXME 列表数据变更后，快捷键滚动失效
function handleScroll() {
  if (searchResultRef.value) {
    const contentDom = searchResultRef.value.osInstance()!.elements().content
    let scrollTo = 0
    if (actived.value !== -1) {
      scrollTo = contentDom.scrollTop
      const activedOffsetTop = searchResultItemRef.value.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.offsetTop ?? 0
      const activedClientHeight = searchResultItemRef.value.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.clientHeight ?? 0
      const searchScrollTop = contentDom.scrollTop
      const searchClientHeight = contentDom.clientHeight
      if (activedOffsetTop + activedClientHeight > searchScrollTop + searchClientHeight) {
        scrollTo = activedOffsetTop + activedClientHeight - searchClientHeight
      }
      else if (activedOffsetTop <= searchScrollTop) {
        scrollTo = activedOffsetTop
      }
    }
    contentDom.scrollTo({
      top: scrollTo,
    })
  }
}

function pageJump(path: listTypes['path'], link: listTypes['link']) {
  if (link) {
    window.open(link, '_blank')
  }
  else {
    router.push(path)
  }
  isShow.value = false
}
</script>

<template>
  <TransitionRoot as="template" :show="isShow" @after-leave="isScrollbarsInit = false">
    <Dialog :initial-focus="searchInputRef" class="fixed inset-0 flex z-2000" @close="isShow && eventBus.emit('global-search-toggle')">
      <TransitionChild as="template" v-bind="overlayTransitionClass">
        <div class="fixed inset-0 transition-opacity bg-stone-200/75 dark:bg-stone-8/75 backdrop-blur-sm" />
      </TransitionChild>
      <div class="fixed inset-0">
        <div class="flex h-full items-end sm:items-center justify-center text-center p-4 sm:p-0">
          <TransitionChild as="template" v-bind="transitionClass">
            <DialogPanel class="relative text-left w-full sm:max-w-2xl h-full max-h-4/5 flex flex-col">
              <div class="flex flex-col bg-white dark:bg-stone-8 rounded-xl shadow-xl overflow-y-auto">
                <div class="flex items-center px-4 py-3" border-b="~ solid stone-2 dark:stone-7">
                  <SvgIcon name="ep:search" :size="18" class="text-stone-5" />
                  <input ref="searchInputRef" v-model="searchInput" placeholder="搜索页面，支持标题、URL模糊查询" class="w-full focus:outline-none border-0 rounded-md placeholder-stone-4 dark:placeholder-stone-5 text-base px-3 bg-transparent text-dark dark:text-white" @keydown.esc="eventBus.emit('global-search-toggle')" @keydown.up.prevent="keyUp" @keydown.down.prevent="keyDown" @keydown.enter.prevent="keyEnter">
                </div>
                <DialogDescription class="relative m-0 of-y-hidden">
                  <OverlayScrollbarsComponent ref="searchResultRef" :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" class="h-full" @os-initialized="isScrollbarsInit = true">
                    <template v-if="isScrollbarsInit">
                      <template v-if="resultList.length > 0">
                        <a v-for="(item, index) in resultList" ref="searchResultItemRef" :key="item.path" class="flex items-center cursor-pointer" :class="{ 'bg-stone-2/40 dark:bg-stone-7/40': index === actived }" :data-index="index" @click="pageJump(item.path, item.link)" @mouseover="actived = index">
                          <SvgIcon v-if="item.icon" :name="item.icon" :size="20" class="basis-16 transition" :class="{ 'scale-120 text-ui-primary': index === actived }" />
                          <div class="flex-1 flex flex-col gap-1 px-4 py-3 truncate" border-l="~ solid stone-2 dark:stone-7">
                            <div class="text-base font-bold truncate">{{ item.title ?? '[ 无标题 ]' }}</div>
                            <Breadcrumb v-if="item.breadcrumb.length" class="truncate">
                              <BreadcrumbItem v-for="(bc, bcIndex) in item.breadcrumb" :key="bcIndex" class="text-xs">
                                {{ bc.title ?? '[ 无标题 ]' }}
                              </BreadcrumbItem>
                            </Breadcrumb>
                          </div>
                        </a>
                      </template>
                      <template v-else>
                        <div flex="center col" py-6 text-stone-5>
                          <SvgIcon name="tabler:mood-empty" :size="40" />
                          <p text-base m-2>
                            没有找到你想要的
                          </p>
                        </div>
                      </template>
                    </template>
                  </OverlayScrollbarsComponent>
                </DialogDescription>
                <div v-if="settingsStore.mode === 'pc'" class="px-4 py-3 flex justify-between" border-t="~ solid stone-2 dark:stone-7">
                  <div class="flex gap-8">
                    <div class="inline-flex items-center gap-1 text-xs">
                      <HKbd>
                        <SvgIcon name="ion:md-return-left" :size="14" />
                      </HKbd>
                      <span>访问</span>
                    </div>
                    <div class="inline-flex items-center gap-1 text-xs">
                      <HKbd>
                        <SvgIcon name="ant-design:caret-up-filled" :size="14" />
                      </HKbd>
                      <HKbd>
                        <SvgIcon name="ant-design:caret-down-filled" :size="14" />
                      </HKbd>
                      <span>切换</span>
                    </div>
                  </div>
                  <div v-if="settingsStore.settings.navSearch.enableHotkeys" class="inline-flex items-center gap-1 text-xs">
                    <HKbd>
                      ESC
                    </HKbd>
                    <span>退出</span>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
