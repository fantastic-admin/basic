<script setup lang="ts">
import type { MenuRecordRaw } from '@fantastic-admin/types'
import { match } from 'pinyin-pro'
import { useHotkeyBindings } from '@/hotkeys/useHotkeys'
import Breadcrumb from '@/layouts/components/Breadcrumb/index.vue'
import BreadcrumbItem from '@/layouts/components/Breadcrumb/item.vue'
import { resolveRoutePath } from '@/utils'

defineOptions({
  name: 'ToolbarMenuSearchModal',
})

const isShow = defineModel<boolean>({
  default: false,
})

const router = useRouter()
const appSettingsStore = useAppSettingsStore()
const appRouteStore = useAppRouteStore()
const appMenuStore = useAppMenuStore()

const { generateTitle } = useAppMenu()

interface listTypes {
  path: string
  icon?: string
  title?: string | (() => string)
  link?: string
}

const searchInput = ref('')
const sourceList = ref<listTypes[]>([])
const actived = ref(0)

const searchResultRef = useTemplateRef('searchResultRef')
const searchResultItemRef = useTemplateRef<HTMLElement[]>('searchResultItemRef')

const resultList = computed(() => {
  let result = []
  result = sourceList.value.filter((item) => {
    let flag = false
    if (searchInput.value !== '') {
      if (item.path.includes(searchInput.value)) {
        flag = true
      }
      if (
        generateTitle(item.title).toString().includes(searchInput.value)
        || (match(generateTitle(item.title).toString(), searchInput.value, { continuous: true })?.length ?? 0) > 0
      ) {
        flag = true
      }
      if (appRouteStore.getRouteMatchedByPath(item.path).some((b) => {
        return generateTitle(b.meta?.title).toString().includes(searchInput.value)
          || (match(generateTitle(b.meta?.title).toString(), searchInput.value, { continuous: true })?.length ?? 0) > 0
      })) { flag = true }
    }
    return flag
  })
  return result
})

useHotkeyBindings({
  'menuSearch.moveUp': () => {
    keyUp()
  },
  'menuSearch.moveDown': () => {
    keyDown()
  },
  'menuSearch.confirm': () => {
    keyEnter()
  },
  'menuSearch.close': () => {
    isShow.value = false
  },
}, () => isShow.value)

watch(() => isShow.value, (val) => {
  if (val) {
    searchInput.value = ''
    actived.value = 0
  }
})
watch(() => resultList.value, () => {
  actived.value = 0
  handleScroll()
})
watch(() => actived.value, () => {
  handleScroll()
})

onMounted(() => {
  initSourceList()
})

function initSourceList() {
  sourceList.value = []
  appMenuStore.allMenus.forEach((item) => {
    getSourceList(item.children)
  })
}

function hasChildren(item: MenuRecordRaw) {
  let flag = true
  if (item.children?.every(i => i.meta?.menu === false)) {
    flag = false
  }
  return flag
}
function getSourceList(arr: MenuRecordRaw[], basePath?: string, icon?: string) {
  arr.forEach((item) => {
    if (item.meta?.menu !== false) {
      if (item.children && hasChildren(item)) {
        getSourceList(
          item.children,
          resolveRoutePath(basePath, item.path),
          item.meta?.icon ?? icon,
        )
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
  }
}
function keyDown() {
  if (resultList.value.length) {
    actived.value += 1
    if (actived.value > resultList.value.length - 1) {
      actived.value = 0
    }
  }
}
function keyEnter() {
  searchResultItemRef.value?.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.click()
}
function handleScroll() {
  if (searchResultRef.value?.ref?.el?.viewportElement) {
    const contentDom = searchResultRef.value.ref.el.viewportElement
    let scrollTo = 0
    if (resultList.value.length > 0) {
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
  <FaModal v-model="isShow" :footer="appSettingsStore.mode === 'pc'" :closable="false" open-auto-focus border class="w-full lg-max-w-2xl" content-class="flex flex-col p-0 min-h-auto" header-class="p-0" footer-class="p-0">
    <template #header>
      <div class="flex flex-shrink-0 h-12 items-center">
        <div class="flex-center h-full w-14">
          <FaIcon name="i-ri:search-line" class="text-foreground/30 size-4" />
        </div>
        <input v-model="searchInput" placeholder="支持标题、拼音(首字母)、URL模糊查询" class="text-base text-foreground border-0 rounded-md bg-transparent h-full w-full focus-outline-none placeholder-foreground/30" @keydown.esc.prevent="isShow = false" @keydown.up.prevent="keyUp" @keydown.down.prevent="keyDown" @keydown.enter.prevent="keyEnter">
        <div v-if="appSettingsStore.mode === 'mobile'" class="border-s flex-center h-full w-14">
          <FaIcon name="i-carbon:close" class="size-4" @click="isShow = false" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="px-4 py-3 flex w-full justify-between">
        <div class="flex gap-8">
          <div class="text-xs inline-flex gap-1 items-center">
            <FaKbd>⏎</FaKbd>
            <span>访问</span>
          </div>
          <div class="text-xs inline-flex gap-1 items-center">
            <FaKbd>
              <FaIcon name="i-ant-design:caret-up-filled" />
            </FaKbd>
            <FaKbd>
              <FaIcon name="i-ant-design:caret-down-filled" />
            </FaKbd>
            <span>切换</span>
          </div>
        </div>
        <div v-if="appSettingsStore.settings.toolbar.menuSearch.hotkeys" class="text-xs inline-flex gap-1 items-center">
          <FaKbd>Esc</FaKbd>
          <span>退出</span>
        </div>
      </div>
    </template>
    <FaScrollArea ref="searchResultRef">
      <template v-if="resultList.length > 0">
        <div v-for="(item, index) in resultList" ref="searchResultItemRef" :key="item.path" class="p-4" :data-index="index" @click="pageJump(item.path, item.link)" @mouseover="actived = index">
          <a class="border rounded-lg flex cursor-pointer items-center" :class="{ '-mt-4': index !== 0, 'bg-accent border-primary shadow-[0_0_0_1px_oklch(var(--primary))]': index === actived, 'op-50': index !== actived }">
            <div class="flex-center basis-16 -me-4">
              <FaIcon v-if="item.icon" :name="item.icon" class="size-5 transition" :class="{ 'scale-120 text-primary': index === actived }" />
            </div>
            <div class="px-4 py-3 flex flex-1 flex-col gap-1 truncate">
              <div class="text-base font-bold text-start truncate">{{ generateTitle(item.title) }}</div>
              <Breadcrumb v-if="appRouteStore.getRouteMatchedByPath(item.path).length" class="truncate">
                <BreadcrumbItem v-for="(bc, bcIndex) in appRouteStore.getRouteMatchedByPath(item.path)" :key="bcIndex" class="text-xs">
                  {{ generateTitle(bc.meta?.title) }}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </a>
        </div>
      </template>
      <template v-else-if="searchInput === ''">
        <div class="text-secondary-foreground/50 py-6 flex-col-center h-full">
          <FaIcon name="i-tabler:mood-smile" class="size-10" />
          <p class="text-base m-2">
            输入你要搜索的导航
          </p>
        </div>
      </template>
      <template v-else>
        <div class="text-secondary-foreground/50 py-6 flex-col-center h-full">
          <FaIcon name="i-tabler:mood-empty" class="size-10" />
          <p class="text-base m-2">
            没有找到你想要的
          </p>
        </div>
      </template>
    </FaScrollArea>
  </FaModal>
</template>
