import router from '@/router'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

export default function useMenu() {
  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()

  function switchTo(index: number | string) {
    menuStore.setActived(index)
    if (settingsStore.menu.switchMainMenuAndPageJump) {
      void router.push(menuStore.sidebarMenusFirstDeepestPath)
    }
  }

  return {
    switchTo,
  }
}
