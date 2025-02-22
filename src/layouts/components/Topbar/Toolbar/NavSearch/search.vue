<script setup lang="ts">
import type { Menu } from '@/types/global'
import Breadcrumb from '@/layouts/components/Breadcrumb/index.vue'
import BreadcrumbItem from '@/layouts/components/Breadcrumb/item.vue'
import useMenuStore from '@/store/modules/menu'
import useRouteStore from '@/store/modules/route'
import useSettingsStore from '@/store/modules/settings'
import { resolveRoutePath } from '@/utils'
import { useFocus } from '@vueuse/core'
import hotkeys from 'hotkeys-js'

defineOptions({
  name: 'Search',
})

const isShow = defineModel<boolean>({
  default: false,
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
}

const searchInput = ref('')
const searchInputRef = useTemplateRef('searchInputRef')
const { focused: searchInputFocused } = useFocus(searchInputRef)
const sourceList = ref<listTypes[]>([])
const actived = ref(-1)

const searchResultRef = useTemplateRef('searchResultRef')
const searchResultItemRef = useTemplateRef<HTMLElement[]>('searchResultItemRef')

const resultList = computed(() => {
  let result = []
  result = sourceList.value.filter((item) => {
    let flag = false
    if (searchInput.value !== '') {
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
      if (routeStore.getRouteMatchedByPath(item.path).some((b) => {
        return typeof b.meta?.title === 'function' ? b.meta?.title().includes(searchInput.value) : b.meta?.title?.includes(searchInput.value)
      })) {
        flag = true
      }
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
  hotkeys('command+k, ctrl+k', (e) => {
    if (settingsStore.settings.navSearch.enableHotkeys) {
      e.preventDefault()
      isShow.value = true
    }
  })
})

onUnmounted(() => {
  hotkeys.unbind('command+k, ctrl+k')
})

function initSourceList() {
  sourceList.value = []
  menuStore.allMenus.forEach((item) => {
    getSourceList(item.children)
  })
}

function hasChildren(item: Menu.recordRaw) {
  let flag = true
  if (item.children?.every(i => i.meta?.menu === false)) {
    flag = false
  }
  return flag
}
function getSourceList(arr: Menu.recordRaw[], basePath?: string, icon?: string) {
  arr.forEach((item) => {
    if (item.meta?.menu !== false) {
      if (item.children && hasChildren(item)) {
        getSourceList(item.children, resolveRoutePath(basePath, item.path), item.meta?.icon ?? icon)
      }
      else {
        sourceList.value.push({
          path: resolveRoutePath(basePath, item.path),
          icon: item.meta?.icon ?? icon,
          title: item.meta?.title,
          link: item.meta?.link,
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
  if (searchResultRef.value?.areaRef?.ref?.el?.viewportElement) {
    const contentDom = searchResultRef.value.areaRef.ref.el.viewportElement
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
  <FaModal ref="searchResultRef" v-model="isShow" border :footer="settingsStore.mode === 'pc'" :closable="false" class="w-full lg-max-w-2xl" content-class="flex flex-col p-0 min-h-auto" header-class="p-0" footer-class="p-0" @opened="searchInputFocused = true">
    <template #header>
      <div class="h-12 flex flex-shrink-0 items-center">
        <div class="h-full w-14 flex-center">
          <FaIcon name="i-ri:search-line" class="size-4 text-foreground/30" />
        </div>
        <input ref="searchInputRef" v-model="searchInput" placeholder="搜索页面，支持标题、URL模糊查询" class="h-full w-full border-0 rounded-md bg-transparent text-base text-foreground focus-outline-none placeholder-foreground/30" @keydown.esc.prevent="isShow = false" @keydown.up.prevent="keyUp" @keydown.down.prevent="keyDown" @keydown.enter.prevent="keyEnter">
        <div v-if="settingsStore.mode === 'mobile'" class="h-full w-14 flex-center border-s">
          <FaIcon name="i-carbon:close" class="size-4" @click="isShow = false" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full flex justify-between px-4 py-3">
        <div class="flex gap-8">
          <div class="inline-flex items-center gap-1 text-xs">
            <FaKbd>
              <FaIcon name="i-ion:md-return-left" class="size-4" />
            </FaKbd>
            <span>访问</span>
          </div>
          <div class="inline-flex items-center gap-1 text-xs">
            <FaKbd>
              <FaIcon name="i-ant-design:caret-up-filled" class="size-4" />
            </FaKbd>
            <FaKbd>
              <FaIcon name="i-ant-design:caret-down-filled" class="size-4" />
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
    </template>
    <div>
      <template v-if="resultList.length > 0">
        <div v-for="(item, index) in resultList" ref="searchResultItemRef" :key="item.path" class="p-4" :data-index="index" @click="pageJump(item.path, item.link)" @mouseover="actived = index">
          <a class="flex cursor-pointer items-center border rounded-lg" :class="{ '-mt-4': index !== 0, 'bg-accent': index === actived }">
            <FaIcon v-if="item.icon" :name="item.icon" class="size-5 basis-16 transition" :class="{ 'scale-120 text-primary': index === actived }" />
            <div class="flex flex-1 flex-col gap-1 truncate border-s px-4 py-3">
              <div class="truncate text-start text-base font-bold">{{ (typeof item.title === 'function' ? item.title() : item.title) ?? '[ 无标题 ]' }}</div>
              <Breadcrumb v-if="routeStore.getRouteMatchedByPath(item.path).length" class="truncate">
                <BreadcrumbItem v-for="(bc, bcIndex) in routeStore.getRouteMatchedByPath(item.path)" :key="bcIndex" class="text-xs">
                  {{ (typeof bc.meta?.title === 'function' ? bc.meta?.title() : bc.meta?.title) ?? '[ 无标题 ]' }}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </a>
        </div>
      </template>
      <template v-else-if="searchInput === ''">
        <div class="h-full flex-col-center py-6 text-secondary-foreground/50">
          <FaIcon name="i-tabler:mood-smile" class="size-10" />
          <p class="m-2 text-base">
            输入你要搜索的导航
          </p>
        </div>
      </template>
      <template v-else>
        <div class="h-full flex-col-center py-6 text-secondary-foreground/50">
          <FaIcon name="i-tabler:mood-empty" class="size-10" />
          <p class="m-2 text-base">
            没有找到你想要的
          </p>
        </div>
      </template>
    </div>
  </FaModal>
</template>
