import type { SettingsOptions } from '@fantastic-admin/settings'
import type { RequiredDeep } from 'type-fest'

export type HotkeyIdMap = Record<string, string>
export type HotkeyIdValue<T extends HotkeyIdMap> = T[keyof T]

export interface HotkeyContextBase {
  settings: RequiredDeep<SettingsOptions>
}

export type HotkeyHelpGroup = 'global' | 'nav' | 'tabbar' | (string & {})

export interface HotkeyDisplayKeys {
  default: string[]
  mac?: string[]
}

export interface HotkeyHelpMeta<TContext extends HotkeyContextBase = HotkeyContextBase> {
  group: HotkeyHelpGroup
  groupTitleKey?: string
  titleKey: string
  order?: number
  visible?: (ctx: TContext) => boolean
  displayKeys: HotkeyDisplayKeys
}

export interface HotkeyBinding<
  TId extends string = string,
  TContext extends HotkeyContextBase = HotkeyContextBase,
> {
  id: TId
  keys: string[]
  preventDefault?: boolean
  enabled?: (ctx: TContext) => boolean
  help?: HotkeyHelpMeta<TContext>
}

export interface HotkeyHandlerArgs {
  event: KeyboardEvent
  hotkey: string
}

export type HotkeyHandler = (args: HotkeyHandlerArgs) => void

export type HotkeyHandlersMap<TId extends string = string> = Partial<Record<TId, HotkeyHandler>>
