<script setup lang="ts">
import type { Menu } from '@/types/global'
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-vue'
import Breadcrumb from '@/layouts/components/Breadcrumb/index.vue'
import BreadcrumbItem from '@/layouts/components/Breadcrumb/item.vue'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import { resolveRoutePath } from '@/utils'
import { Dialog, DialogDescription, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { cloneDeep } from 'es-toolkit'
import hotkeys from 'hotkeys-js'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

defineOptions({
  name: 'Search',
})

const isShow = defineModel<boolean>({
  default: false,
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
    enterFrom: 'opacity-0 translate-y-4 lg-translate-y-0 lg-scale-95',
    enterTo: 'opacity-100 translate-y-0 lg-scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 translate-y-0 lg-scale-100',
    leaveTo: 'opacity-0 translate-y-4 lg-translate-y-0 lg-scale-95',
  }
})

const router = useRouter()
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

interface listTypes {
  path: string
  icon?: string
  title?: string | (() => string)
  link?: string
  breadcrumb: {
    title?: string | (() => string)
  }[]
}

const searchInput = ref('')
const sourceList = ref<listTypes[]>([])
const actived = ref(-1)

const searchInputRef = useTemplateRef('searchInputRef')
const searchResultRef = useTemplateRef<OverlayScrollbarsComponentRef>('searchResultRef')
const searchResultItemRef = useTemplateRef<HTMLElement[]>('searchResultItemRef')

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
    if (item.breadcrumb.some((b) => {
      if (typeof b.title === 'function') {
        if (b.title().includes(searchInput.value)) {
          return true
        }
      }
      else {
        if (b.title?.includes(searchInput.value)) {
          return true
        }
      }
      return false
    })) {
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
    hotkeys('esc', (e) => {
      if (settingsStore.settings.navSearch.enableHotkeys) {
        e.preventDefault()
        isShow.value = false
      }
    })
  }
  else {
    hotkeys.unbind('up', keyUp)
    hotkeys.unbind('down', keyDown)
    hotkeys.unbind('enter', keyEnter)
    hotkeys.unbind('esc')
  }
})
watch(() => resultList.value, () => {
  actived.value = -1
  handleScroll()
})

onMounted(() => {
  initSourceList()
  hotkeys('alt+s', (e) => {
    if (settingsStore.settings.navSearch.enableHotkeys) {
      e.preventDefault()
      isShow.value = true
    }
  })
})

onUnmounted(() => {
  hotkeys.unbind('alt+s')
})

function initSourceList() {
  sourceList.value = []
  menuStore.allMenus.forEach((item) => {
    getSourceListByMenus(item.children)
  })
}

function hasChildren(item: Menu.recordRaw) {
  let flag = true
  if (item.children?.every(i => i.meta?.menu === false)) {
    flag = false
  }
  return flag
}
function getSourceListByMenus(arr: Menu.recordRaw[], basePath?: string, icon?: string, breadcrumb?: { title?: string | (() => string) }[]) {
  arr.forEach((item) => {
    if (item.meta?.menu !== false) {
      const breadcrumbTemp = cloneDeep(breadcrumb) || []
      if (item.children && hasChildren(item)) {
        breadcrumbTemp.push({
          title: item.meta?.title,
        })
        getSourceListByMenus(item.children, resolveRoutePath(basePath, item.path), item.meta?.icon ?? icon, breadcrumbTemp)
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
    searchResultItemRef.value?.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.click()
  }
}
function handleScroll() {
  if (searchResultRef.value) {
    const contentDom = searchResultRef.value.osInstance()!.elements().content
    let scrollTo = 0
    if (actived.value !== -1) {
      scrollTo = contentDom.scrollTop
      const activedOffsetTop = searchResultItemRef.value?.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.offsetTop ?? 0
      const activedClientHeight = searchResultItemRef.value?.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.clientHeight ?? 0
      const searchScrollTop = contentDom.scrollTop
      const searchClientHeight = contentDom.clientHeight
      if (activedOffsetTop + activedClientHeight > searchScrollTop + searchClientHeight) {
        scrollTo = activedOffsetTop + activedClientHeight - searchClientHeight
      }
      else if (activedOffsetTop <= searchScrollTop) {
        scrollTo = activedOffsetTop - 16
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
  <TransitionRoot as="template" :show="isShow">
    <Dialog :initial-focus="searchInputRef" class="fixed inset-0 z-2000 flex" @close="isShow = false">
      <TransitionChild v-if="settingsStore.mode === 'pc'" as="template" v-bind="overlayTransitionClass">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0">
        <div class="h-full flex items-end justify-center text-center lg-items-center lg-p-4">
          <TransitionChild as="template" v-bind="transitionClass">
            <div class="h-full max-h-full w-full lg-max-h-4/5 lg-max-w-2xl">
              <DialogPanel class="relative h-full flex flex-col text-left lg-max-h-full">
                <div class="h-full flex flex-col overflow-y-auto border bg-background shadow-xl lg-h-auto lg-rounded-md">
                  <div class="h-12 flex flex-shrink-0 items-center border-b">
                    <div class="h-full w-14 flex-center">
                      <FaIcon name="i-ri:search-line" :size="18" class="text-foreground/30" />
                    </div>
                    <input ref="searchInputRef" v-model="searchInput" placeholder="搜索页面，支持标题、URL模糊查询" class="h-full w-full border-0 rounded-md bg-transparent text-base text-foreground focus-outline-none placeholder-foreground/30" @keydown.esc="isShow = false" @keydown.up.prevent="keyUp" @keydown.down.prevent="keyDown" @keydown.enter.prevent="keyEnter">
                    <div v-if="settingsStore.mode === 'mobile'" class="h-full w-14 flex-center border-s">
                      <FaIcon name="i-carbon:close" :size="18" @click="isShow = false" />
                    </div>
                  </div>
                  <DialogDescription class="relative m-0 h-full of-y-hidden">
                    <OverlayScrollbarsComponent ref="searchResultRef" :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" defer class="h-full">
                      <template v-if="resultList.length > 0">
                        <div v-for="(item, index) in resultList" ref="searchResultItemRef" :key="item.path" class="p-4" :data-index="index" @click="pageJump(item.path, item.link)" @mouseover="actived = index">
                          <a class="flex cursor-pointer items-center border rounded-lg" :class="{ '-mt-4': index !== 0, 'bg-accent': index === actived }">
                            <FaIcon v-if="item.icon" :name="item.icon" :size="20" class="basis-16 transition" :class="{ 'scale-120 text-primary': index === actived }" />
                            <div class="flex flex-1 flex-col gap-1 truncate border-s px-4 py-3">
                              <div class="truncate text-start text-base font-bold">{{ (typeof item.title === 'function' ? item.title() : item.title) ?? '[ 无标题 ]' }}</div>
                              <Breadcrumb v-if="item.breadcrumb.length" class="truncate">
                                <BreadcrumbItem v-for="(bc, bcIndex) in item.breadcrumb" :key="bcIndex" class="text-xs">
                                  {{ (typeof bc.title === 'function' ? bc.title() : bc.title) ?? '[ 无标题 ]' }}
                                </BreadcrumbItem>
                              </Breadcrumb>
                            </div>
                          </a>
                        </div>
                      </template>
                      <template v-else-if="searchInput === ''">
                        <div class="h-full flex-col-center py-6 text-secondary-foreground/50">
                          <FaIcon name="i-tabler:mood-smile" :size="40" />
                          <p class="m-2 text-base">
                            输入你要搜索的导航
                          </p>
                        </div>
                      </template>
                      <template v-else>
                        <div class="h-full flex-col-center py-6 text-secondary-foreground/50">
                          <FaIcon name="i-tabler:mood-empty" :size="40" />
                          <p class="m-2 text-base">
                            没有找到你想要的
                          </p>
                        </div>
                      </template>
                    </OverlayScrollbarsComponent>
                  </DialogDescription>
                  <div v-if="settingsStore.mode === 'pc'" class="flex justify-between border-t px-4 py-3">
                    <div class="flex gap-8">
                      <div class="inline-flex items-center gap-1 text-xs">
                        <FaKbd>
                          <FaIcon name="i-ion:md-return-left" :size="14" />
                        </FaKbd>
                        <span>访问</span>
                      </div>
                      <div class="inline-flex items-center gap-1 text-xs">
                        <FaKbd>
                          <FaIcon name="i-ant-design:caret-up-filled" :size="14" />
                        </FaKbd>
                        <FaKbd>
                          <FaIcon name="i-ant-design:caret-down-filled" :size="14" />
                        </FaKbd>
                        <span>切换</span>
                      </div>
                    </div>
                    <div v-if="settingsStore.settings.navSearch.enableHotkeys" class="inline-flex items-center gap-1 text-xs">
                      <FaKbd>
                        ESC
                      </FaKbd>
                      <span>退出</span>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
