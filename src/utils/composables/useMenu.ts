import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'

export default function useMenu() {
  const router = useRouter()

  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()

  function switchTo(index: number | string) {
    menuStore.setActived(index)
    if (settingsStore.settings.menu.switchMainMenuAndPageJump) {
      router.push(menuStore.sidebarMenusFirstDeepestPath)
    }
  }

  return {
    switchTo,
  }
}
