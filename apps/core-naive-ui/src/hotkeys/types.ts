import type { useAppSettingsStore } from '@/store/modules/app/settings'

export type HotkeyHelpGroup = 'global' | 'nav' | 'tabbar' | 'page'
export type HotkeyId = typeof import('./registry').HOTKEY_ID[keyof typeof import('./registry').HOTKEY_ID]

export interface HotkeyContext {
  settings: ReturnType<typeof useAppSettingsStore>['settings']
}

export interface HotkeyDisplayKeys {
  default: string[]
  mac?: string[]
}

export interface HotkeyHelpMeta {
  group: HotkeyHelpGroup
  titleKey: string
  order?: number
  visible?: (ctx: HotkeyContext) => boolean
  displayKeys: HotkeyDisplayKeys
}

export interface HotkeyBinding {
  id: HotkeyId
  keys: string[]
  preventDefault?: boolean
  enabled?: (ctx: HotkeyContext) => boolean
  help?: HotkeyHelpMeta
}

export interface HotkeyHandlerArgs {
  event: KeyboardEvent
  hotkey: string
}

export type HotkeyHandler = (args: HotkeyHandlerArgs) => void

export type HotkeyHandlersMap = Partial<Record<HotkeyId, HotkeyHandler>>
