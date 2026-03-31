export type ThemeColorScheme = 'light' | 'dark' | ''
export type RouteMode = 'hash' | 'html5'
export type RouteBaseOn = 'frontend' | 'backend'
export type MenuMode = 'side' | 'head' | 'single'
export type MainMenuClickMode = 'switch' | 'jump' | 'smart'
export type TopbarMode = 'static' | 'fixed' | 'sticky'

export interface AppAccountSettings {
  /**
   * 权限验证功能
   * @description 控制是否启用权限验证功能
   * @default false
   */
  auth?: boolean
}

export interface AppCopyrightSettings {
  /**
   * 版权信息
   * @description 控制是否显示底部版权信息，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
   * @default false
   */
  enable?: boolean
  /**
   * 网站运行日期
   * @description 网站开始运行的日期
   * @default ''
   */
  dates?: string
  /**
   * 公司名称
   * @description 版权信息中显示的公司名称
   * @default ''
   */
  company?: string
  /**
   * 网站地址
   * @description 版权信息中显示的网站地址
   * @default ''
   */
  website?: string
}
export interface AppHomeSettings {
  /**
   * 主页
   * @description 控制是否启用主页功能
   * @default true
   */
  enable?: boolean
  /**
   * 主页标题
   * @description 主页的标题
   * @default '主页'
   */
  title?: string
  /**
   * 主页完整路径
   * @description 主页的完整路由路径
   * @default '/'
   */
  fullPath?: string
}

export interface AppSettings {
  /** 账号相关配置 */
  account?: AppAccountSettings
  /**
   * 路由模式
   * @description 设置应用的路由模式
   * @default 'hash'
   * @example
   * 'hash' - Hash 模式
   * 'html5' - HTML5 模式
   */
  routeMode?: RouteMode
  /**
   * 路由数据来源
   * @description 指定路由数据的来源方式
   * @default 'frontend'
   * @example
   * 'frontend' - 前端
   * 'backend' - 后端
   */
  routeBaseOn?: RouteBaseOn
  /**
   * 动态标题
   * @description 控制是否启用动态页面标题功能
   * @default false
   */
  dynamicTitle?: boolean
  /**
   * 哀悼模式
   * @description 开启后网站将会整体变灰
   * @default false
   */
  rip?: boolean
  /**
   * 移动端访问
   * @description 关闭后，网站将禁用移动端访问
   * @default true
   */
  mobile?: boolean
  /**
   * 主页相关配置
   */
  home?: AppHomeSettings
  /**
   * 版权信息配置
   */
  copyright?: AppCopyrightSettings
}

export interface ThemeSettings {
  /**
   * 颜色方案
   * @description 设置应用的颜色方案
   * @default 'light'
   * @example
   * 'light' - 明亮模式
   * 'dark' - 暗黑模式
   * '' - 跟随系统
   */
  colorScheme?: ThemeColorScheme
  /**
   * 圆角系数
   * @description 设置界面元素的圆角大小，取值范围 0 到 1
   * @default 0.5
   * @example 0.5 - 中等圆角
   */
  radius?: number
  /**
   * 色弱模式
   * @description 启用色弱友好的颜色方案
   * @default false
   */
  colorAmblyopia?: boolean
}

export interface MenuSettings {
  /**
   * 导航菜单模式
   * @description 设置导航菜单的显示模式
   * @default 'side'
   * @example
   * 'side' - 侧边栏模式（有主导航菜单）
   * 'head' - 顶部模式
   * 'single' - 侧边栏模式（无主导航菜单）
   */
  mode?: MenuMode
  /**
   * 主导航菜单点击模式
   * @description 设置主导航菜单菜单项的点击行为
   * @default 'switch'
   * @example
   * 'switch' - 切换
   * 'jump' - 跳转
   * 'smart' - 智能选择，判断次导航是否只有且只有一个可访问的菜单进行切换或跳转操作
   */
  mainMenuClickMode?: MainMenuClickMode
  /**
   * 次导航菜单只保持一个子项的展开
   * @description 控制次导航菜单是否只允许同时展开一个子导航菜单
   * @default true
   */
  subMenuUniqueExpand?: boolean
  /**
   * 次导航菜单收起
   * @description 控制次导航菜单的默认收起状态
   * @default false
   */
  subMenuCollapse?: boolean
  /**
   * 次导航菜单的展开/收起按钮
   * @description 控制是否显示次导航菜单的展开/收起控制按钮
   * @default false
   */
  subMenuCollapseButton?: boolean
  /**
   * 快捷键
   * @description 控制是否启用导航菜单相关的快捷键功能
   * @default false
   */
  hotkeys?: boolean
}

export interface TopbarSettings {
  /**
   * 标签栏
   * @description 控制是否在顶栏显示标签栏
   * @default false
   */
  tabbar?: boolean
  /**
   * 工具栏
   * @description 控制是否在顶栏显示工具栏
   * @default true
   */
  toolbar?: boolean
  /**
   * 模式
   * @description 设置顶栏的显示模式
   * @default 'static'
   * @example
   * 'static' - 静止，跟随页面滚动
   * 'fixed' - 固定，不跟随页面滚动，始终固定在顶部
   * 'sticky' - 粘性，页面往下滚动时隐藏，往上滚动时显示
   */
  mode?: TopbarMode
}

export interface TabbarSettings {
  /**
   * 图标
   * @description 控制标签是否显示图标
   * @default false
   */
  icon?: boolean
  /**
   * 快捷键
   * @description 控制是否启用标签栏相关的快捷键功能
   * @default false
   */
  hotkeys?: boolean
}

export interface ToolbarMenuSearchSettings {
  /**
   * 导航菜单搜索
   * @description 控制是否启用导航菜单搜索功能
   * @default true
   */
  enable?: boolean
  /**
   * 快捷键
   * @description 控制是否启用导航菜单搜索的快捷键
   * @default true
   */
  hotkeys?: boolean
}

export interface ToolbarSettings {
  /**
   * 面包屑导航
   * @description 控制是否显示面包屑导航
   * @default true
   */
  breadcrumb?: boolean
  /**
   * 导航搜索配置
   */
  menuSearch?: ToolbarMenuSearchSettings
  /**
   * 全屏
   * @description 控制是否启用全屏切换功能
   * @default false
   */
  fullscreen?: boolean
  /**
   * 页面刷新
   * @description 控制是否启用页面刷新功能
   * @default false
   */
  pageReload?: boolean
  /**
   * 颜色主题
   * @description 控制是否启用颜色主题切换功能
   * @default false
   */
  colorScheme?: boolean
}

export interface PageSettings {
  /**
   * 载入进度条
   * @description 控制是否显示页面载入进度条
   * @default true
   */
  progress?: boolean
}

export interface SettingsOptions {
  /**
   * 应用设置
   * @description 应用级别的全局配置
   */
  app?: AppSettings
  /**
   * 主题设置
   * @description 主题和样式相关的配置
   */
  theme?: ThemeSettings
  /**
   * 导航菜单设置
   * @description 导航菜单相关的配置
   */
  menu?: MenuSettings
  /**
   * 顶栏设置
   * @description 顶部工具栏相关的配置
   */
  topbar?: TopbarSettings
  /**
   * 标签栏设置
   * @description 标签页相关的配置
   */
  tabbar?: TabbarSettings
  /**
   * 工具栏设置
   * @description 工具栏功能相关的配置
   */
  toolbar?: ToolbarSettings
  /**
   * 页面设置
   * @description 页面行为和显示相关的配置
   */
  page?: PageSettings
}

export interface SettingsLegacyOptions {
  app?: {
    colorScheme?: '' | 'light' | 'dark'
    radius?: number
    enableMournMode?: boolean
    enableColorAmblyopiaMode?: boolean
    enablePermission?: boolean
    enableProgress?: boolean
    enableDynamicTitle?: boolean
    routeBaseOn?: 'frontend' | 'backend' | 'filesystem'
  }
  home?: {
    enable?: boolean
    title?: string
    fullPath?: string
  }
  layout?: {
    enableMobileAdaptation?: boolean
  }
  menu?: {
    mode?: 'side' | 'head' | 'single'
    mainMenuClickMode?: 'switch' | 'jump' | 'smart'
    subMenuUniqueOpened?: boolean
    subMenuCollapse?: boolean
    enableSubMenuCollapseButton?: boolean
    enableHotkeys?: boolean
  }
  topbar?: {
    mode?: 'static' | 'fixed' | 'sticky'
  }
  tabbar?: {
    enable?: boolean
    enableIcon?: boolean
    enableHotkeys?: boolean
  }
  toolbar?: {
    enable?: boolean
    breadcrumb?: boolean
    navSearch?: boolean
    fullscreen?: boolean
    pageReload?: boolean
    colorScheme?: boolean
  }
  navSearch?: {
    enableHotkeys?: boolean
  }
  copyright?: {
    enable?: boolean
    dates?: string
    company?: string
    website?: string
  }
}
