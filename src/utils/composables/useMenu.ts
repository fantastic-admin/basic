import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'

export default function useMenu() {
  const router = useRouter()

  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()

  function switchTo(index: number) {
    menuStore.setActived(index)
    if (
      settingsStore.settings.menu.mainMenuClickMode === 'jump'
      || (settingsStore.settings.menu.mainMenuClickMode === 'smart' && menuStore.sidebarMenusHasOnlyMenu)
    ) {
      router.push(menuStore.sidebarMenusFirstDeepestPath)
    }
  }

  return {
    switchTo,
  }
}
