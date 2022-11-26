<script lang="ts" setup name="Search">
import { cloneDeep } from 'lodash-es'
import hotkeys from 'hotkeys-js'
import { isExternalLink } from '@/utils'
import eventBus from '@/utils/eventBus'
import useSettingsStore from '@/store/modules/settings'
import useRouteStore from '@/store/modules/route'
import useMenuStore from '@/store/modules/menu'
import type { Menu, Route } from '@/global'

const router = useRouter()

const settingsStore = useSettingsStore()
const routeStore = useRouteStore()
const menuStore = useMenuStore()

interface listTypes {
  icon?: string
  title?: string | Function
  breadcrumb: (string | Function | undefined)[]
  path: string
}

const isShow = ref(false)
const searchInput = ref('')
const sourceList = ref<listTypes[]>([])
const actived = ref(-1)

const searchInputRef = ref()
const searchResultRef = ref()
const searchResultItemRef = ref<any>([])
const setSearchResultItemRef = (el: any) => searchResultItemRef.value.push(el)
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
    if (item.breadcrumb.some((b) => {
      let flag = false
      if (b) {
        if (typeof b === 'function') {
          if (b().includes(searchInput.value)) {
            flag = true
          }
        }
        else {
          if (b.includes(searchInput.value)) {
            flag = true
          }
        }
      }
      return flag
    })) {
      flag = true
    }
    return flag
  })
  return result
})

watch(() => isShow.value, (val) => {
  if (val) {
    document.body.classList.add('hidden')
    searchResultRef.value.scrollTop = 0
    // 当搜索显示的时候绑定上、下、回车快捷键，隐藏的时候再解绑。另外当 input 处于 focus 状态时，采用 vue 来绑定键盘事件
    hotkeys('up', keyUp)
    hotkeys('down', keyDown)
    hotkeys('enter', keyEnter)
    setTimeout(() => {
      searchInputRef.value.focus()
    }, 500)
  }
  else {
    document.body.classList.remove('hidden')
    hotkeys.unbind('up', keyUp)
    hotkeys.unbind('down', keyDown)
    hotkeys.unbind('enter', keyEnter)
    setTimeout(() => {
      searchInput.value = ''
      actived.value = -1
    }, 500)
  }
})
watch(() => resultList.value, () => {
  actived.value = -1
  searchResultItemRef.value = []
  handleScroll()
})

onMounted(() => {
  eventBus.on('global-search-toggle', () => {
    isShow.value = !isShow.value
  })
  hotkeys('alt+s', (e) => {
    if (settingsStore.navSearch.enable && settingsStore.navSearch.enableHotkeys) {
      e.preventDefault()
      isShow.value = true
    }
  })
  hotkeys('esc', (e) => {
    if (settingsStore.navSearch.enable && settingsStore.navSearch.enableHotkeys) {
      e.preventDefault()
      isShow.value = false
    }
  })
  if (settingsStore.app.routeBaseOn !== 'filesystem') {
    routeStore.routes.forEach((item) => {
      item.children && getSourceList(item.children)
    })
  }
  else {
    menuStore.menus.forEach((item) => {
      getSourceListByMenus(item.children)
    })
  }
})

function hasChildren(item: Route.recordRaw) {
  let flag = true
  if (item.children && item.children.every(i => i.meta.sidebar === false)) {
    flag = false
  }
  return flag
}
function getSourceList(arr: Route.recordRaw[], basePath?: string, icon?: string, breadcrumb?: (string | Function | undefined)[]) {
  arr.forEach((item) => {
    if (item.meta.sidebar !== false) {
      const breadcrumbTemp = cloneDeep(breadcrumb) || []
      if (item.children && hasChildren(item)) {
        breadcrumbTemp.push(item.meta.title)
        getSourceList(item.children, basePath ? [basePath, item.path].join('/') : item.path, item.meta.icon || icon, breadcrumbTemp)
      }
      else {
        breadcrumbTemp.push(item.meta.title)
        let path = ''
        if (isExternalLink(item.path)) {
          path = item.path
        }
        else {
          path = basePath ? [basePath, item.path].join('/') : item.path
        }
        sourceList.value.push({
          icon: item.meta.icon || icon,
          title: item.meta.title,
          breadcrumb: breadcrumbTemp,
          path,
        })
      }
    }
  })
}
function getSourceListByMenus(arr: Menu.recordRaw[], icon?: string, breadcrumb?: (string | Function | undefined)[]) {
  arr.forEach((item) => {
    const breadcrumbTemp = cloneDeep(breadcrumb) || []
    if (item.children && item.children.length > 0) {
      breadcrumbTemp.push(item.meta.title)
      getSourceListByMenus(item.children, item.meta.icon, breadcrumbTemp)
    }
    else {
      breadcrumbTemp.push(item.meta.title)
      sourceList.value.push({
        icon: item.meta.icon || icon,
        title: item.meta.title,
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
    searchResultItemRef.value[actived.value].click()
  }
}
function handleScroll() {
  let scrollTo = 0
  if (actived.value !== -1) {
    scrollTo = searchResultRef.value.scrollTop
    const activedOffsetTop = searchResultItemRef.value[actived.value].offsetTop
    const activedClientHeight = searchResultItemRef.value[actived.value].clientHeight
    const searchScrollTop = searchResultRef.value.scrollTop
    const searchClientHeight = searchResultRef.value.clientHeight
    if (activedOffsetTop + activedClientHeight > searchScrollTop + searchClientHeight) {
      scrollTo = activedOffsetTop + activedClientHeight - searchClientHeight
    }
    else if (activedOffsetTop <= searchScrollTop) {
      scrollTo = activedOffsetTop
    }
  }
  searchResultRef.value.scrollTo({
    top: scrollTo,
  })
}

function pageJump(url: string) {
  if (isExternalLink(url)) {
    window.open(url, 'top')
  }
  else {
    router.push(url)
  }
}
</script>

<template>
  <div id="search" :class="{ searching: isShow }" @click="isShow && eventBus.emit('global-search-toggle')">
    <div class="container">
      <div class="search-box" @click.stop>
        <el-input ref="searchInputRef" v-model="searchInput" placeholder="搜索页面，支持标题、URL模糊查询" clearable @keydown.esc="eventBus.emit('global-search-toggle')" @keydown.up.prevent="keyUp" @keydown.down.prevent="keyDown" @keydown.enter.prevent="keyEnter">
          <template #prefix>
            <el-icon>
              <svg-icon name="ep:search" />
            </el-icon>
          </template>
        </el-input>
        <div v-if="settingsStore.mode === 'pc'" class="tips">
          <div class="tip">
            <span>Alt</span>+<span>S</span>
            唤醒搜索面板
          </div>
          <div class="tip">
            <span>
              <el-icon>
                <svg-icon name="search-up" />
              </el-icon>
            </span>
            <span>
              <el-icon>
                <svg-icon name="search-down" />
              </el-icon>
            </span>
            切换搜索结果
          </div>
          <div class="tip">
            <span>
              <el-icon>
                <svg-icon name="search-enter" />
              </el-icon>
            </span>
            访问页面
          </div>
          <div class="tip">
            <span>ESC</span>
            退出
          </div>
        </div>
      </div>
      <div ref="searchResultRef" class="result" :class="{ mobile: settingsStore.mode === 'mobile' }">
        <a v-for="(item, index) in resultList" :key="item.path" :ref="setSearchResultItemRef" class="item" :class="{ actived: index === actived }" @click="pageJump(item.path)" @mouseover="actived = index">
          <el-icon class="icon">
            <svg-icon v-if="item.icon" :name="item.icon" />
          </el-icon>
          <div class="info">
            <div class="title">
              {{ item.title ?? '[ 无标题 ]' }}
            </div>
            <div class="breadcrumb">
              <span v-for="(bc, bcIndex) in item.breadcrumb" :key="bcIndex">
                {{ bc ?? '[ 无标题 ]' }}
                <el-icon>
                  <svg-icon name="ep:arrow-right" />
                </el-icon>
              </span>
            </div>
            <div class="path">{{ item.path }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#search {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--el-overlay-color-lighter);
  backdrop-filter: blur(10px);
  transition: all 0.2s;
  transform: translateZ(0);
  opacity: 0;
  visibility: hidden;

  &.searching {
    opacity: 1;
    visibility: visible;

    .container {
      transform: initial;
      filter: initial;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    height: 100%;
    margin: 0 auto;
    transition: all 0.2s;
    transform: scale(1.1);
    filter: blur(10px);

    .search-box {
      margin: 50px 20px 40px;

      :deep(.el-input__inner) {
        height: 52px;
        line-height: 52px;
      }

      :deep(.el-input__icon) {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .tips {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 20px;
        line-height: 24px;
        font-size: 14px;
        color: #fff;

        span {
          margin: 0 5px;
          padding: 3px 8px 5px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: bold;
          color: var(--el-text-color-primary);
          background-color: var(--el-fill-color);
          box-shadow: inset 0 -2px var(--el-fill-color-lighter), inset 0 0 1px 1px var(--el-fill-color-darker);
        }
      }
    }

    .result {
      position: relative;
      margin: 0 20px;
      max-height: calc(100% - 250px);
      border-radius: 5px;
      overflow: auto;
      background-color: var(--el-bg-color);
      box-shadow: 0 0 0 1px var(--el-border-color-darker);

      &.mobile {
        max-height: calc(100% - 200px);
      }

      .item {
        display: flex;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.3s;

        &.actived {
          background-color: var(--el-bg-color-page);

          .icon {
            color: var(--el-color-primary);
            transform: scale(1.2);
          }

          .info {
            border-left-color: var(--el-border-color);

            .title {
              color: var(--el-text-color-primary);
            }

            .breadcrumb,
            .path {
              color: var(--el-text-color-regular);
            }
          }
        }

        .icon {
          flex: 0 0 66px;
          text-align: center;
          color: var(--el-color-info);
          font-size: 20px;
          transition: all 0.3s;
        }

        .info {
          flex: 1;
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-left: 1px solid var(--el-border-color-lighter);
          padding: 5px 10px 7px;
          transition: all 0.3s;

          @include text-overflow(1, true);

          .title {
            font-size: 18px;
            font-weight: bold;
            color: var(--el-text-color-regular);

            @include text-overflow(1, true);
          }

          .breadcrumb,
          .path {
            font-size: 12px;
            color: var(--el-text-color-secondary);
            transition: all 0.3s;

            @include text-overflow(1, true);
          }

          .breadcrumb {
            span {
              margin-right: 5px;

              &:last-child i {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
