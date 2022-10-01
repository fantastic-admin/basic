import router from '@/router'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import { isExternalLink } from '@/utils'

export default function useMenu() {
  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()

  function switchTo(index: number | string) {
    menuStore.setActived(index)
    if (settingsStore.menu.switchMainMenuAndPageJump) {
      if (isExternalLink(menuStore.sidebarMenusFirstDeepestPath)) {
        window.open(menuStore.sidebarMenusFirstDeepestPath, '_blank')
      }
      else {
        router.push(menuStore.sidebarMenusFirstDeepestPath)
      }
    }
  }

  return {
    switchTo,
  }
}
