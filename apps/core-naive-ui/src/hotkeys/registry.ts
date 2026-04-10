import type { HotkeyBinding } from './types'
import { EXT_HOTKEY_ID, extendGlobalHotkeyBindings, extendScopedHotkeyBindings } from './registry.extend'

export const HOTKEY_ID = {
  systemInfoOpen: 'system.info.open',
  menuSearchOpen: 'menuSearch.open',
  menuNext: 'menu.next',
  menuPrev: 'menu.prev',
  tabbarPrev: 'tabbar.prev',
  tabbarNext: 'tabbar.next',
  tabbarCloseCurrent: 'tabbar.closeCurrent',
  tabbarGotoVisibleIndex: 'tabbar.gotoVisibleIndex',
  tabbarGotoLast: 'tabbar.gotoLast',
  pageReload: 'page.reload',
  menuSearchMoveUp: 'menuSearch.moveUp',
  menuSearchMoveDown: 'menuSearch.moveDown',
  menuSearchConfirm: 'menuSearch.confirm',
  menuSearchClose: 'menuSearch.close',
  ...EXT_HOTKEY_ID,
} as const

export const hotkeyIds = Object.values(HOTKEY_ID)

/**
 * Hotkeys registry 维护约定
 *
 * 1. 新增快捷键优先在这里补充定义，不要在业务组件里直接写死键位字符串
 * 2. 这里仅维护“定义”和“展示元数据”，不要把业务 handler 塞进 registry
 * 3. 配置类开关尽量写在 enabled / help.visible 中，避免帮助面板与真实行为不一致
 * 4. 需要展示在快捷键帮助面板中的项，必须补充 help
 * 5. 仅局部场景使用的快捷键，也建议在这里定义，再由对应组件按需注册
 */
export const globalHotkeyBindings: HotkeyBinding[] = [
  {
    id: HOTKEY_ID.systemInfoOpen,
    keys: ['command+i', 'ctrl+i'],
    help: {
      group: 'global',
      titleKey: 'global.system',
      order: 10,
      displayKeys: {
        default: ['Ctrl', 'I'],
        mac: ['⌘', 'I'],
      },
    },
  },
  {
    id: HOTKEY_ID.menuSearchOpen,
    keys: ['command+k', 'ctrl+k'],
    enabled: ctx => ctx.settings.toolbar.menuSearch.enable && ctx.settings.toolbar.menuSearch.hotkeys,
    help: {
      group: 'global',
      titleKey: 'global.search',
      order: 20,
      visible: ctx => ctx.settings.toolbar.menuSearch.enable && ctx.settings.toolbar.menuSearch.hotkeys,
      displayKeys: {
        default: ['Ctrl', 'K'],
        mac: ['⌘', 'K'],
      },
    },
  },
  {
    id: HOTKEY_ID.menuNext,
    keys: ['alt+`'],
    enabled: ctx => ctx.settings.menu.hotkeys && ['side', 'head'].includes(ctx.settings.menu.mode),
    help: {
      group: 'nav',
      titleKey: 'nav.next',
      order: 10,
      visible: ctx => ctx.settings.menu.hotkeys && ['side', 'head'].includes(ctx.settings.menu.mode),
      displayKeys: {
        default: ['Alt', '`'],
        mac: ['⌥', '`'],
      },
    },
  },
  {
    id: HOTKEY_ID.menuPrev,
    keys: ['alt+shift+`'],
    enabled: ctx => ctx.settings.menu.hotkeys && ['side', 'head'].includes(ctx.settings.menu.mode),
    help: {
      group: 'nav',
      titleKey: 'nav.prev',
      order: 20,
      visible: ctx => ctx.settings.menu.hotkeys && ['side', 'head'].includes(ctx.settings.menu.mode),
      displayKeys: {
        default: ['Alt', 'Shift', '`'],
        mac: ['⌥', '⇧', '`'],
      },
    },
  },
  {
    id: HOTKEY_ID.tabbarPrev,
    keys: ['alt+left'],
    enabled: ctx => ctx.settings.topbar.tabbar && ctx.settings.tabbar.hotkeys,
    help: {
      group: 'tabbar',
      titleKey: 'tabbar.prev',
      order: 10,
      visible: ctx => ctx.settings.topbar.tabbar && ctx.settings.tabbar.hotkeys,
      displayKeys: {
        default: ['Alt', '←'],
        mac: ['⌥', '←'],
      },
    },
  },
  {
    id: HOTKEY_ID.tabbarNext,
    keys: ['alt+right'],
    enabled: ctx => ctx.settings.topbar.tabbar && ctx.settings.tabbar.hotkeys,
    help: {
      group: 'tabbar',
      titleKey: 'tabbar.next',
      order: 20,
      visible: ctx => ctx.settings.topbar.tabbar && ctx.settings.tabbar.hotkeys,
      displayKeys: {
        default: ['Alt', '→'],
        mac: ['⌥', '→'],
      },
    },
  },
  {
    id: HOTKEY_ID.tabbarCloseCurrent,
    keys: ['alt+w'],
    enabled: ctx => ctx.settings.topbar.tabbar && ctx.settings.tabbar.hotkeys,
    help: {
      group: 'tabbar',
      titleKey: 'tabbar.close',
      order: 30,
      visible: ctx => ctx.settings.topbar.tabbar && ctx.settings.tabbar.hotkeys,
      displayKeys: {
        default: ['Alt', 'W'],
        mac: ['⌥', 'W'],
      },
    },
  },
  {
    id: HOTKEY_ID.tabbarGotoVisibleIndex,
    keys: ['alt+1', 'alt+2', 'alt+3', 'alt+4', 'alt+5', 'alt+6', 'alt+7', 'alt+8', 'alt+9'],
    enabled: ctx => ctx.settings.topbar.tabbar && ctx.settings.tabbar.hotkeys,
    help: {
      group: 'tabbar',
      titleKey: 'tabbar.n',
      order: 40,
      visible: ctx => ctx.settings.topbar.tabbar && ctx.settings.tabbar.hotkeys,
      displayKeys: {
        default: ['Alt', '1~9'],
        mac: ['⌥', '1~9'],
      },
    },
  },
  {
    id: HOTKEY_ID.tabbarGotoLast,
    keys: ['alt+0'],
    enabled: ctx => ctx.settings.topbar.tabbar && ctx.settings.tabbar.hotkeys,
    help: {
      group: 'tabbar',
      titleKey: 'tabbar.last',
      order: 50,
      visible: ctx => ctx.settings.topbar.tabbar && ctx.settings.tabbar.hotkeys,
      displayKeys: {
        default: ['Alt', '0'],
        mac: ['⌥', '0'],
      },
    },
  },
  {
    id: HOTKEY_ID.pageReload,
    keys: ['f5'],
  },
  ...extendGlobalHotkeyBindings,
]

export const menuSearchHotkeyBindings: HotkeyBinding[] = [
  {
    id: HOTKEY_ID.menuSearchMoveUp,
    keys: ['up'],
  },
  {
    id: HOTKEY_ID.menuSearchMoveDown,
    keys: ['down'],
  },
  {
    id: HOTKEY_ID.menuSearchConfirm,
    keys: ['enter'],
  },
  {
    id: HOTKEY_ID.menuSearchClose,
    keys: ['esc'],
  },
]

export const hotkeyBindings: HotkeyBinding[] = [
  ...globalHotkeyBindings,
  ...menuSearchHotkeyBindings,
  ...extendScopedHotkeyBindings,
]

if (import.meta.env.DEV) {
  const registeredIds = hotkeyBindings.map(item => item.id)
  const missingIds = hotkeyIds.filter(id => !registeredIds.includes(id))
  const duplicateIds = registeredIds.filter((id, index) => registeredIds.indexOf(id) !== index)

  if (missingIds.length || duplicateIds.length) {
    console.warn('[hotkeys] registry consistency check failed', {
      missingIds,
      duplicateIds: [...new Set(duplicateIds)],
    })
  }
}
