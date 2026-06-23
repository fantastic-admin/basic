import type { HotkeyBinding, HotkeyContextBase } from './types'

export const BUILTIN_HOTKEY_ID = {
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
} as const

export type BuiltinHotkeyId = typeof BUILTIN_HOTKEY_ID[keyof typeof BUILTIN_HOTKEY_ID]

/**
 * Hotkeys registry 维护约定
 *
 * 1. 新增框架内建快捷键优先在这里补充定义，不要在业务组件里直接写死键位字符串
 * 2. 这里仅维护“定义”和“展示元数据”，不要把业务 handler 塞进 registry
 * 3. 配置类开关尽量写在 enabled / help.visible 中，避免帮助面板与真实行为不一致
 * 4. 需要展示在快捷键帮助面板中的项，必须补充 help
 * 5. 仅局部场景使用的快捷键，也建议在这里定义，再由对应组件按需注册
 */
export const builtinGlobalHotkeyBindings: HotkeyBinding<BuiltinHotkeyId, HotkeyContextBase>[] = [
  {
    id: BUILTIN_HOTKEY_ID.systemInfoOpen,
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
    id: BUILTIN_HOTKEY_ID.menuSearchOpen,
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
    id: BUILTIN_HOTKEY_ID.menuNext,
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
    id: BUILTIN_HOTKEY_ID.menuPrev,
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
    id: BUILTIN_HOTKEY_ID.tabbarPrev,
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
    id: BUILTIN_HOTKEY_ID.tabbarNext,
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
    id: BUILTIN_HOTKEY_ID.tabbarCloseCurrent,
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
    id: BUILTIN_HOTKEY_ID.tabbarGotoVisibleIndex,
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
    id: BUILTIN_HOTKEY_ID.tabbarGotoLast,
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
    id: BUILTIN_HOTKEY_ID.pageReload,
    keys: ['f5'],
  },
]

export const builtinMenuSearchHotkeyBindings: HotkeyBinding<BuiltinHotkeyId, HotkeyContextBase>[] = [
  {
    id: BUILTIN_HOTKEY_ID.menuSearchMoveUp,
    keys: ['up'],
  },
  {
    id: BUILTIN_HOTKEY_ID.menuSearchMoveDown,
    keys: ['down'],
  },
  {
    id: BUILTIN_HOTKEY_ID.menuSearchConfirm,
    keys: ['enter'],
  },
  {
    id: BUILTIN_HOTKEY_ID.menuSearchClose,
    keys: ['esc'],
  },
]
