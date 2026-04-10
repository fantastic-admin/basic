export function useAppTabbar() {
  const route = useRoute()
  const router = useRouter()

  const appTabbarStore = useAppTabbarStore()

  function getId() {
    return route.fullPath
  }

  function closeById(tabId = getId()) {
    if (checkClose(tabId, false)) {
      const activedTabId = getId()
      // 如果关闭的标签正好是当前路由
      if (tabId === activedTabId) {
        const index = appTabbarStore.list.findIndex(item => item.tabId === tabId)
        if (index > 0) {
          router.close(appTabbarStore.list[index - 1].fullPath)
        }
        else {
          router.close(appTabbarStore.list[index + 1].fullPath)
        }
      }
      else {
        appTabbarStore.remove(tabId)
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
      const index = appTabbarStore.list.findIndex(item => item.tabId === tabId)
      router.push(appTabbarStore.list[index].fullPath)
    }
    appTabbarStore.removeOtherSide(tabId)
  }

  /**
   * 关闭左侧标签页
   */
  function closeLeftSide(tabId = getId()) {
    const activedTabId = getId()
    // 如果操作的是非当前路由标签页，需要判断当前标签页是否在指定标签页左侧，如果是则先跳转到指定路由标签页
    if (tabId !== activedTabId) {
      const index = appTabbarStore.list.findIndex(item => item.tabId === tabId)
      const activedIndex = appTabbarStore.list.findIndex(item => item.tabId === activedTabId)
      if (activedIndex < index) {
        router.push(appTabbarStore.list[index].fullPath)
      }
    }
    appTabbarStore.removeLeftSide(tabId)
  }

  /**
   * 关闭右侧标签页
   */
  function closeRightSide(tabId = getId()) {
    const activedTabId = getId()
    // 如果操作的是非当前路由标签页，需要判断当前标签页是否在指定标签页右侧，如果是则先跳转到指定路由标签页
    if (tabId !== activedTabId) {
      const index = appTabbarStore.list.findIndex(item => item.tabId === tabId)
      const activedIndex = appTabbarStore.list.findIndex(item => item.tabId === activedTabId)
      if (activedIndex > index) {
        router.push(appTabbarStore.list[index].fullPath)
      }
    }
    appTabbarStore.removeRightSide(tabId)
  }

  /**
   * 校验指定标签是否可关闭
   */
  function checkClose(tabId = getId(), checkOnly = true) {
    let flag = true
    const index = appTabbarStore.list.findIndex(item => item.tabId === tabId)
    if (index < 0) {
      flag = false
      !checkOnly && faToast.warning('关闭的标签页不存在', {
        position: 'top-center',
      })
    }
    else if (appTabbarStore.list.length <= 1) {
      flag = false
      !checkOnly && faToast.warning('当前只有一个标签页，不可关闭', {
        position: 'top-center',
      })
    }
    return flag
  }

  /**
   * 校验指定标签两侧是否有可关闭的标签
   */
  function checkCloseOtherSide(tabId = getId()) {
    return appTabbarStore.list.some((item) => {
      return item.tabId !== tabId
    })
  }

  /**
   * 校验指定标签左侧是否有可关闭的标签
   */
  function checkCloseLeftSide(tabId = getId()) {
    let flag = true
    if (tabId === appTabbarStore.list[0]?.tabId) {
      flag = false
    }
    else {
      const index = appTabbarStore.list.findIndex(item => item.tabId === tabId)
      flag = appTabbarStore.list.some((item, i) => {
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
    if (tabId === appTabbarStore.list.at(-1)?.tabId) {
      flag = false
    }
    else {
      const index = appTabbarStore.list.findIndex(item => item.tabId === tabId)
      flag = appTabbarStore.list.some((item, i) => {
        return i >= index && item.tabId !== tabId
      })
    }
    return flag
  }

  return {
    getId,
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
