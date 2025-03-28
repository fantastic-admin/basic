import type { RouteLocationRaw } from 'vue-router'
import useTabbarStore from '@/store/modules/tabbar'
import { toast } from 'vue-sonner'

export default function useTabbar() {
  const route = useRoute()
  const router = useRouter()

  const tabbarStore = useTabbarStore()

  function getId() {
    return route.fullPath
  }

  function close(to: RouteLocationRaw) {
    const tabId = getId()
    router.push(to).then(() => {
      tabbarStore.remove(tabId)
    })
  }

  function closeById(tabId = getId()) {
    if (checkClose(tabId, false)) {
      const activedTabId = getId()
      // 如果关闭的标签正好是当前路由
      if (tabId === activedTabId) {
        const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
        if (index < tabbarStore.list.length - 1) {
          close(tabbarStore.list[index + 1].fullPath)
        }
        else {
          close(tabbarStore.list[index - 1].fullPath)
        }
      }
      else {
        tabbarStore.remove(tabId)
      }
    }
  }

  /**
   * 关闭两侧标签页
   */
  function closeOtherSide(tabId = getId()) {
    const activedTabId = getId()
    // 如果操作的是非当前路由标签页，则先跳转到指定路由标签页
    if (tabId !== activedTabId) {
      const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
      router.push(tabbarStore.list[index].fullPath)
    }
    tabbarStore.removeOtherSide(tabId)
  }

  /**
   * 关闭左侧标签页
   */
  function closeLeftSide(tabId = getId()) {
    const activedTabId = getId()
    // 如果操作的是非当前路由标签页，需要判断当前标签页是否在指定标签页左侧，如果是则先跳转到指定路由标签页
    if (tabId !== activedTabId) {
      const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
      const activedIndex = tabbarStore.list.findIndex(item => item.tabId === activedTabId)
      if (activedIndex < index) {
        router.push(tabbarStore.list[index].fullPath)
      }
    }
    tabbarStore.removeLeftSide(tabId)
  }

  /**
   * 关闭右侧标签页
   */
  function closeRightSide(tabId = getId()) {
    const activedTabId = getId()
    // 如果操作的是非当前路由标签页，需要判断当前标签页是否在指定标签页右侧，如果是则先跳转到指定路由标签页
    if (tabId !== activedTabId) {
      const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
      const activedIndex = tabbarStore.list.findIndex(item => item.tabId === activedTabId)
      if (activedIndex > index) {
        router.push(tabbarStore.list[index].fullPath)
      }
    }
    tabbarStore.removeRightSide(tabId)
  }

  /**
   * 校验指定标签是否可关闭
   */
  function checkClose(tabId = getId(), checkOnly = true) {
    let flag = true
    const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
    if (index < 0) {
      flag = false
      !checkOnly && toast.warning('关闭的标签页不存在', {
        position: 'top-center',
      })
    }
    else if (tabbarStore.list.length <= 1) {
      flag = false
      !checkOnly && toast.warning('当前只有一个标签页，不可关闭', {
        position: 'top-center',
      })
    }
    return flag
  }

  /**
   * 校验指定标签两侧是否有可关闭的标签
   */
  function checkCloseOtherSide(tabId = getId()) {
    return tabbarStore.list.some((item) => {
      return item.tabId !== tabId
    })
  }

  /**
   * 校验指定标签左侧是否有可关闭的标签
   */
  function checkCloseLeftSide(tabId = getId()) {
    let flag = true
    if (tabId === tabbarStore.list[0]?.tabId) {
      flag = false
    }
    else {
      const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
      flag = tabbarStore.list.some((item, i) => {
        return i < index && item.tabId !== tabId
      })
    }
    return flag
  }

  /**
   * 校验指定标签右侧是否有可关闭的标签
   */
  function checkCloseRightSide(tabId = getId()) {
    let flag = true
    if (tabId === tabbarStore.list.at(-1)?.tabId) {
      flag = false
    }
    else {
      const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
      flag = tabbarStore.list.some((item, i) => {
        return i >= index && item.tabId !== tabId
      })
    }
    return flag
  }

  return {
    getId,
    close,
    closeById,
    closeOtherSide,
    closeLeftSide,
    closeRightSide,
    checkClose,
    checkCloseOtherSide,
    checkCloseLeftSide,
    checkCloseRightSide,
  }
}
