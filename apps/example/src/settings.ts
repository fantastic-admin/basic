import { setSettings } from '@fantastic-admin/settings'

export default setSettings({
  app: {
    account: {
      auth: true,
    },
    dynamicTitle: true,
    copyright: {
      enable: true,
      dates: '2020-present',
      company: 'Fantastic-admin',
      website: 'https://fantastic-admin.hurui.me',
    },
  },
  menu: {
    mainMenuClickMode: 'smart',
    subMenuCollapseButton: true,
    hotkeys: true,
  },
  topbar: {
    tabbar: true,
    toolbar: true,
    mode: 'fixed',
  },
  tabbar: {
    icon: true,
    hotkeys: true,
  },
  toolbar: {
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },
})
