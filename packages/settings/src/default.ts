import type { RequiredDeep } from 'type-fest'
import type { SettingsOptions } from '../types'

const settingsDefault: RequiredDeep<SettingsOptions> = {
  app: {
    account: {
      auth: false,
    },
    routeMode: 'hash',
    routeBaseOn: 'frontend',
    dynamicTitle: false,
    rip: false,
    mobile: true,
    home: {
      enable: true,
      title: '主页',
      fullPath: '/',
    },
    copyright: {
      enable: false,
      dates: '',
      company: '',
      website: '',
    },
  },
  theme: {
    colorScheme: 'light',
    radius: 0.5,
    colorAmblyopia: false,
  },
  menu: {
    mode: 'side',
    mainMenuClickMode: 'switch',
    subMenuUniqueExpand: true,
    subMenuCollapse: false,
    subMenuCollapseButton: false,
    hotkeys: false,
  },
  topbar: {
    tabbar: false,
    toolbar: true,
    mode: 'static',
  },
  tabbar: {
    icon: false,
    hotkeys: false,
  },
  toolbar: {
    breadcrumb: true,
    menuSearch: {
      enable: true,
      hotkeys: true,
    },
    fullscreen: false,
    pageReload: false,
    colorScheme: false,
  },
  page: {
    progress: true,
  },
}

export default settingsDefault
