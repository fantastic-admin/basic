import type { Settings } from '#/global'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
    enableDynamicTitle: true,
    enableAppSetting: true,
  },
  layout: {
    enableMobileAdaptation: true,
  },
  menu: {
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
  },
  topbar: {
    mode: 'fixed',
  },
  toolbar: {
    enableFullscreen: true,
    enablePageReload: true,
    enableColorScheme: true,
  },
  copyright: {
    enable: true,
    dates: '2020-2023',
    company: 'Fantastic-admin',
    website: 'https://hooray.gitee.io/fantastic-admin/',
    beian: '',
  },
}

export default globalSettings
