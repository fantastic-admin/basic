import type {
  HotkeyBinding,
  HotkeyContextBase,
  HotkeyDisplayKeys,
  HotkeyHandler,
  HotkeyHandlerArgs,
  HotkeyHandlersMap,
  HotkeyHelpGroup,
  HotkeyHelpMeta,
} from '@fantastic-admin/hotkeys'
import { createHotkeys } from '@fantastic-admin/hotkeys'
import { EXT_HOTKEY_ID, extendGlobalHotkeyBindings, extendScopedHotkeyBindings } from './extend'

const appHotkeys = createHotkeys({
  extendIds: EXT_HOTKEY_ID,
  extendGlobalHotkeyBindings,
  extendScopedHotkeyBindings,
  getContext: () => ({
    settings: useAppSettingsStore().settings,
  }),
})

export const HOTKEY_ID = appHotkeys.HOTKEY_ID
export const hotkeyIds = appHotkeys.hotkeyIds
export const globalHotkeyBindings = appHotkeys.globalHotkeyBindings
export const menuSearchHotkeyBindings = appHotkeys.menuSearchHotkeyBindings
export const hotkeyBindings = appHotkeys.hotkeyBindings
export const useHotkey = appHotkeys.useHotkey
export const useHotkeyBindings = appHotkeys.useHotkeyBindings

export type HotkeyId = typeof HOTKEY_ID[keyof typeof HOTKEY_ID]
export type {
  HotkeyBinding,
  HotkeyContextBase,
  HotkeyDisplayKeys,
  HotkeyHandler,
  HotkeyHandlerArgs,
  HotkeyHandlersMap,
  HotkeyHelpGroup,
  HotkeyHelpMeta,
}
