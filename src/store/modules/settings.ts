import type { RecursiveRequired, Settings } from '@/global'
import settings from '@/settings'
import settingsDefault from '@/settings.default'

interface SettingsStore extends RecursiveRequired<Settings.all> {
  subMenuCollapseLastStatus: boolean
  mode: 'pc' | 'mobile'
  title: string
}

// 合并配置
Object.keys(settingsDefault).forEach((key) => {
  Object.assign(settingsDefault[key as keyof Settings.all], settings[key as keyof Settings.all])
})

const useSettingsStore = defineStore(
  // 唯一ID
  'settings',
  {
    state: (): SettingsStore => ({
      ...settingsDefault,
      // 侧边栏是否收起（用于记录 pc 模式下最后的状态）
      subMenuCollapseLastStatus: settingsDefault.menu.subMenuCollapse,
      // 显示模式，支持：mobile、pc
      mode: 'pc',
      // 页面标题
      title: '',
    }),
    actions: {
      // 设置网页标题
      setTitle(title: string) {
        this.title = title
      },
      // 设置访问模式
      setMode(width: number) {
        if (this.layout.enableMobileAdaptation) {
          // 先判断 UA 是否为移动端设备（手机&平板）
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.mode = 'mobile'
          }
          else {
            // 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
            this.mode = width < 992 ? 'mobile' : 'pc'
          }
        }
        else {
          this.mode = 'pc'
        }
      },
      // 切换侧边栏导航展开/收起
      toggleSidebarCollapse() {
        this.menu.subMenuCollapse = !this.menu.subMenuCollapse
        if (this.mode === 'pc') {
          this.subMenuCollapseLastStatus = !this.subMenuCollapseLastStatus
        }
      },
      // 设置主题颜色模式
      setColorScheme(color: Required<Settings.app>['colorScheme']) {
        this.app.colorScheme = color
      },
      // 更新应用配置
      updateSettings(data: Settings.all) {
        Object.assign(this, data)
      },
    },
  },
)

export default useSettingsStore
