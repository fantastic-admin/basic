import type { Settings } from './global'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
    enableDynamicTitle: true,
  },
  layout: {
    enableMobileAdaptation: true,
  },
  menu: {
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
  },
  toolbar: {
    enableFullscreen: true,
    enablePageReload: true,
    enableColorScheme: true,
    enableAppSetting: true,
  },
}

export default globalSettings
