export function useAppMenu() {
  const router = useRouter()

  const appSettingsStore = useAppSettingsStore()
  const appMenuStore = useAppMenuStore()

  function generateTitle(title: string | (() => any) = '[ 无标题 ]') {
    return typeof title === 'function'
      ? title()
      : title
  }

  function switchTo(index: number) {
    appMenuStore.setActived(index)
    if (
      appSettingsStore.settings.menu.mainMenuClickMode === 'jump'
      || (appSettingsStore.settings.menu.mainMenuClickMode === 'smart' && appMenuStore.sidebarMenusHasOnlyMenu)
    ) {
      router.push(appMenuStore.sidebarMenusFirstDeepestPath)
    }
  }

  return {
    generateTitle,
    switchTo,
  }
}
