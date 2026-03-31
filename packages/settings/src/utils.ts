import type { RequiredDeep } from 'type-fest'
import type { SettingsLegacyOptions, SettingsOptions } from '../types'
import { createDefu } from 'defu'
import { cloneDeep } from 'es-toolkit'
import settingsDefault from './default'

export const merge = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value
    return true
  }
})

function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function diffTwoObj(originalObj: Record<string, any>, diffObj: Record<string, any>) {
  if (!isObject(originalObj) || !isObject(diffObj)) {
    return diffObj
  }
  const diff: Record<string, any> = {}
  for (const key in diffObj) {
    const originalValue = originalObj[key]
    const diffValue = diffObj[key]
    if (JSON.stringify(originalValue) !== JSON.stringify(diffValue)) {
      if (isObject(originalValue) && isObject(diffValue)) {
        const nestedDiff = diffTwoObj(originalValue, diffValue)
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff
        }
      }
      else {
        diff[key] = diffValue
      }
    }
  }
  return diff
}

export function setSettings(settings: SettingsOptions) {
  return merge(settings, cloneDeep(settingsDefault)) as RequiredDeep<SettingsOptions>
}

export function setSettingsLegacy(settingsLegacy: SettingsLegacyOptions) {
  const settingsDefaultLegacy: RequiredDeep<SettingsLegacyOptions> = {
    app: {
      colorScheme: 'light',
      radius: 0.5,
      enableMournMode: false,
      enableColorAmblyopiaMode: false,
      enablePermission: false,
      enableProgress: true,
      enableDynamicTitle: false,
      routeBaseOn: 'frontend',
    },
    home: {
      enable: true,
      title: '主页',
      fullPath: '/',
    },
    layout: {
      enableMobileAdaptation: false,
    },
    menu: {
      mode: 'side',
      mainMenuClickMode: 'switch',
      subMenuUniqueOpened: true,
      subMenuCollapse: false,
      enableSubMenuCollapseButton: false,
      enableHotkeys: false,
    },
    topbar: {
      mode: 'static',
    },
    tabbar: {
      enable: false,
      enableIcon: false,
      enableHotkeys: false,
    },
    toolbar: {
      enable: true,
      breadcrumb: true,
      navSearch: true,
      fullscreen: false,
      pageReload: false,
      colorScheme: false,
    },
    navSearch: {
      enableHotkeys: true,
    },
    copyright: {
      enable: false,
      dates: '',
      company: '',
      website: '',
    },
  }

  settingsLegacy = merge(settingsLegacy, cloneDeep(settingsDefaultLegacy))

  const settings: SettingsOptions = {
    app: {
      account: {
        auth: settingsLegacy.app?.enablePermission,
      },
      routeBaseOn: settingsLegacy.app?.routeBaseOn === 'filesystem' ? 'frontend' : settingsLegacy.app?.routeBaseOn,
      dynamicTitle: settingsLegacy.app?.enableDynamicTitle,
      rip: settingsLegacy.app?.enableMournMode,
      mobile: settingsLegacy.layout?.enableMobileAdaptation,
      home: {
        enable: settingsLegacy.home?.enable,
        title: settingsLegacy.home?.title,
        fullPath: settingsLegacy.home?.fullPath,
      },
      copyright: {
        enable: settingsLegacy.copyright?.enable,
        dates: settingsLegacy.copyright?.dates,
        company: settingsLegacy.copyright?.company,
        website: settingsLegacy.copyright?.website,
      },
    },
    theme: {
      colorScheme: settingsLegacy.app?.colorScheme,
      radius: settingsLegacy.app?.radius,
      colorAmblyopia: settingsLegacy.app?.enableColorAmblyopiaMode,
    },
    menu: {
      mode: settingsLegacy.menu?.mode,
      mainMenuClickMode: settingsLegacy.menu?.mainMenuClickMode,
      subMenuUniqueExpand: settingsLegacy.menu?.subMenuUniqueOpened,
      subMenuCollapse: settingsLegacy.menu?.subMenuCollapse,
      subMenuCollapseButton: settingsLegacy.menu?.enableSubMenuCollapseButton,
      hotkeys: settingsLegacy.menu?.enableHotkeys,
    },
    topbar: {
      tabbar: settingsLegacy.tabbar?.enable,
      toolbar: settingsLegacy.toolbar?.enable,
      mode: settingsLegacy.topbar?.mode,
    },
    tabbar: {
      icon: settingsLegacy.tabbar?.enableIcon,
      hotkeys: settingsLegacy.tabbar?.enableHotkeys,
    },
    toolbar: {
      breadcrumb: settingsLegacy.toolbar?.breadcrumb,
      menuSearch: {
        enable: settingsLegacy.toolbar?.navSearch,
        hotkeys: settingsLegacy.navSearch?.enableHotkeys,
      },
      fullscreen: settingsLegacy.toolbar?.fullscreen,
      pageReload: settingsLegacy.toolbar?.pageReload,
      colorScheme: settingsLegacy.toolbar?.colorScheme,
    },
    page: {
      progress: settingsLegacy.app?.enableProgress,
    },
  }

  const result = merge(settings, cloneDeep(settingsDefault))

  // turbo-console-disable-next-line
  console.warn(
    '[Fantastic-admin]\n\n当前正在使用 v5.x 版本的配置，为了您的使用体验，请复制下方 v6.x 配置到 src/settings.ts 中替换\n',
    JSON.stringify(diffTwoObj(settingsDefault, result), null, 2),
  )

  return result as RequiredDeep<SettingsOptions>
}
