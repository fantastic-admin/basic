import type { RouteRecordRaw } from 'vue-router'

export interface RouteMetaRaw {
  /**
   * 权限
   * @description 路由访问权限，配置为数组时，只需满足一个即可进入
   * @default undefined
   * @example
   * 'news:view' - 访问该路由时，需要具备 news:view 权限
   * ['news:view', 'news:edit'] - 访问该路由时，需要具备 news:view 或 news:edit 权限
   */
  auth?: string | string[]

  /**
   * 标题
   * @description 标题会在导航、标签页、面包屑等需要的展示位置显示
   * @default undefined
   * @example
   * '新闻管理' - 标题为新闻管理
   */
  title?: string | (() => string)

  /**
   * 图标
   * @description 导航菜单、标签页等展示区域使用的图标
   * @default undefined
   * @example
   * 'i-ep:lock' - 显示 i-ep:lock 图标
   */
  icon?: string

  /**
   * 是否在导航菜单中显示
   * @description 当子导航菜单里没有可展示的导航菜单时，会直接显示父导航菜单
   * @default true
   */
  menu?: boolean

  /**
   * 高亮导航菜单
   * @description 需要设置完整路由地址
   * @default undefined
   * @example '/news/list'
   */
  activeMenu?: string

  /**
   * 是否默认展开
   * @description 控制该导航菜单是否默认展开
   * @default false
   */
  expand?: boolean

  /**
   * 导航排序
   * @description 数字越大越靠前
   * @default 0
   */
  sort?: number

  /**
   * 是否在面包屑中显示
   * @description 是否在面包屑导航中显示
   * @default true
   */
  breadcrumb?: boolean

  /**
   * 保活
   * @description 根据规则保活当前路由页面
   * @default undefined
   * @example
   * true - 始终保活
   * 'news' - 访问路由name为news的页面时保活
   * ['news', 'user'] - 访问路由name为news或user的页面时保活
   */
  keepAlive?: boolean | string | string[]

  /**
   * 不保活
   * @description 根据规则不保活当前路由页面
   * @default undefined
   * @example
   * 'news' - 访问路由name为news的页面时不保活
   * ['news', 'user'] - 访问路由name为news或user的页面时不保活
   */
  noKeepAlive?: string | string[]

  /**
   * 外部链接
   * @description 会在浏览器新窗口访问该链接
   * @default undefined
   * @example
   * 'https://fantastic-admin.hurui.me' - 在浏览器新窗口打开 Fantastic-admin 官网
   */
  link?: string

  /**
   * 是否显示版权
   * @description 如果不设置，则使用全局配置
   * @default undefined
   */
  copyright?: boolean
}

export interface RouteRecordMainRaw {
  meta?: Pick<RouteMetaRaw, 'auth' | 'title' | 'icon' | 'sort'>
  children: RouteRecordRaw[]
}

export interface MenuRecordRaw {
  path?: string
  meta?: Pick<RouteMetaRaw, 'auth' | 'title' | 'icon' | 'menu' | 'expand' | 'link'>
  children?: MenuRecordRaw[]
}

export interface MenuRecordMainRaw {
  meta?: Pick<RouteMetaRaw, 'auth' | 'title' | 'icon'>
  children: MenuRecordRaw[]
}

export interface TabbarRecordRaw extends Pick<RouteMetaRaw, 'title' | 'icon' | 'activeMenu'> {
  tabId: string
  fullPath: string
  name: string[]
}
