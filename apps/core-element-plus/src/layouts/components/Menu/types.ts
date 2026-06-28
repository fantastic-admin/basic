import type { MenuRecordRaw } from '@fantastic-admin/types'

export interface MenuItem {
  index: string
  indexPath: string[]
  active?: boolean
}

export interface MenuProps {
  menu: MenuRecordRaw[]
  value: string
  accordion?: boolean
  defaultExpandPaths?: string[]
  mode?: 'horizontal' | 'vertical'
  collapse?: boolean
}

export interface MenuInjection {
  props: MenuProps
  getUseId: (obj: object) => string
  items: Record<string, MenuItem>
  subMenus: Record<string, MenuItem>
  activeIndex: MenuProps['value']
  expandMenus: string[]
  mouseInMenu: string[]
  isMenuPopup: boolean
  openMenu: (index: string, indexPath: string[]) => void
  closeMenu: (index: string | string[]) => void
  handleMenuItemClick: (index: string) => void
  handleSubMenuClick: (index: string, indexPath: string[]) => void
}

export const rootMenuInjectionKey = Symbol('rootMenu') as InjectionKey<MenuInjection>

export interface SubMenuProps {
  uniqueKey: string[]
  menu: MenuRecordRaw
  level?: number
}

export interface SubMenuItemProps {
  uniqueKey: string[]
  item: MenuRecordRaw
  level?: number
  subMenu?: boolean
  expand?: boolean
}
