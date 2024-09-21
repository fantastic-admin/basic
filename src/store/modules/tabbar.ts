import type { Tabbar } from '#/global'
import type { RouteLocationNormalized } from 'vue-router'
import useKeepAliveStore from './keepAlive'

const useTabbarStore = defineStore(
  // 唯一ID
  'tabbar',
  () => {
    const keepAliveStore = useKeepAliveStore()

    const list = ref<Tabbar.recordRaw[]>([])
    const leaveIndex = ref(-1)

    // 添加标签页
    async function add(route: RouteLocationNormalized) {
      const names: string[] = []
      route.matched.forEach((v, i) => {
        if (i > 0) {
          v.components?.default.name && names.push(v.components.default.name)
        }
      })
      const meta = route.matched.at(-1)?.meta
      const tabId = route.fullPath
      if (route.name !== 'reload') {
        // 记录查找到的标签页
        const findTab = list.value.find((item) => {
          return item.tabId === tabId
        })
        // 新增标签页
        if (!findTab) {
          const listItem = {
            tabId,
            fullPath: route.fullPath,
            title: typeof meta?.title === 'function' ? meta.title() : meta?.title,
            icon: meta?.icon ?? meta?.breadcrumbNeste?.findLast(item => item.icon)?.icon,
            name: names,
          }
          if (leaveIndex.value >= 0) {
            list.value.splice(leaveIndex.value + 1, 0, listItem)
            leaveIndex.value = -1
          }
          else {
            list.value.push(listItem)
          }
        }
      }
    }
    // 删除指定标签页
    function remove(tabId: Tabbar.recordRaw['tabId']) {
      const keepName: string[] = []
      const removeName: string[] = []
      list.value.forEach((v) => {
        if (v.tabId === tabId) {
          removeName.push(...v.name)
        }
        else {
          keepName.push(...v.name)
        }
      })
      const name: string[] = []
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      // 如果是手动点击关闭 tab 标签页，则删除页面缓存
      keepAliveStore.remove(name)
      list.value = list.value.filter((item) => {
        return item.tabId !== tabId
      })
    }
    // 删除两侧标签页
    function removeOtherSide(tabId: Tabbar.recordRaw['tabId']) {
      const keepName: string[] = []
      const removeName: string[] = []
      list.value.forEach((v) => {
        if (v.tabId !== tabId) {
          removeName.push(...v.name)
        }
        else {
          keepName.push(...v.name)
        }
      })
      const name: string[] = []
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      keepAliveStore.remove(name)
      list.value = list.value.filter((item) => {
        return item.tabId === tabId
      })
    }
    // 删除左侧标签页
    function removeLeftSide(tabId: Tabbar.recordRaw['tabId']) {
      // 查找指定路由对应在标签页列表里的下标
      const index = list.value.findIndex(item => item.tabId === tabId)
      const keepName: string[] = []
      const removeName: string[] = []
      list.value.forEach((v, i) => {
        if (i < index) {
          removeName.push(...v.name)
        }
        else {
          keepName.push(...v.name)
        }
      })
      const name: string[] = []
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      keepAliveStore.remove(name)
      list.value = list.value.filter((_item, i) => {
        return i >= index
      })
    }
    // 删除右侧标签页
    function removeRightSide(tabId: Tabbar.recordRaw['tabId']) {
      // 查找指定路由对应在标签页列表里的下标
      const index = list.value.findIndex(item => item.tabId === tabId)
      const keepName: string[] = []
      const removeName: string[] = []
      list.value.forEach((v, i) => {
        if (i > index) {
          removeName.push(...v.name)
        }
        else {
          keepName.push(...v.name)
        }
      })
      const name: string[] = []
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      keepAliveStore.remove(name)
      list.value = list.value.filter((_item, i) => {
        return i <= index
      })
    }
    // 清空所有标签页，登出的时候需要清空
    function clean() {
      list.value = []
    }

    return {
      list,
      leaveIndex,
      add,
      remove,
      removeOtherSide,
      removeLeftSide,
      removeRightSide,
      clean,
    }
  },
)

export default useTabbarStore
