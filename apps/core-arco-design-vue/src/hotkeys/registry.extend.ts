import type { HotkeyBinding } from './types'

/**
 * 业务扩展快捷键 id
 *
 * 使用方式：
 *
 * export const EXT_HOTKEY_ID = {
 *   demoOpen: 'demo.open',
 * } as const
 */
export const EXT_HOTKEY_ID = {} as const

/**
 * 业务扩展全局快捷键
 */
export const extendGlobalHotkeyBindings: HotkeyBinding[] = []

/**
 * 业务扩展局部快捷键
 */
export const extendScopedHotkeyBindings: HotkeyBinding[] = []
