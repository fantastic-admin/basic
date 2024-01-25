import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

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
  topbar: {
    mode: 'fixed',
  },
  tabbar: {
    enable: true,
    enableIcon: true,
    enableHotkeys: true,
  },
  toolbar: {
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },
  mainPage: {
    enableHotkeys: true,
  },
  copyright: {
    enable: true,
    dates: '2020-present',
    company: 'Fantastic-admin',
    website: 'https://fantastic-admin.gitee.io',
  },
}

export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
