export { default as settingsDefault } from './default'
export type {
  AppAccountSettings,
  AppCopyrightSettings,
  AppHomeSettings,
  AppSettings,
  MenuSettings,
  PageSettings,
  SettingsLegacyOptions,
  SettingsOptions,
  TabbarSettings,
  ThemeSettings,
  ToolbarMenuSearchSettings,
  ToolbarSettings,
} from './types'
export {
  diffTwoObj,
  merge,
  setSettings,
  setSettingsLegacy,
} from './utils'
