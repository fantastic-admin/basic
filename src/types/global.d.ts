import type { RouteRecordRaw } from 'vue-router'

type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>
}
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

declare namespace Settings {
  interface app {
    /**
     * 颜色方案
     * @默认值 `''` 跟随系统
     * @可选值 `'light'` 明亮模式
     * @可选值 `'dark'` 暗黑模式
     */
    colorScheme?: '' | 'light' | 'dark'
    /**
     * 是否开启哀悼模式
     * @默认值 `false`
     */
    enableMournMode?: boolean
    /**
     * 是否开启色弱模式
     * @默认值 `false`
     */
    enableColorAmblyopiaMode?: boolean
    /**
     * 是否开启权限功能
     * @默认值 `false`
     */
    enablePermission?: boolean
    /**
     * 是否开启载入进度条
     * @默认值 `true`
     */
    enableProgress?: boolean
    /**
     * 是否开启动态标题
     * @默认值 `false`
     */
    enableDynamicTitle?: boolean
    /**
     * 路由数据来源
     * @默认值 `'frontend'` 前端
     * @可选值 `'backend'` 后端
     * @可选值 `'filesystem'` 文件系统
     */
    routeBaseOn?: 'frontend' | 'backend' | 'filesystem'
  }
  interface home {
    /**
     * 是否开启主页
     * @默认值 `true`
     */
    enable?: boolean
    /**
     * 主页名称
     * @默认值 `'主页'`
     */
    title?: string
    /**
     * 主页完整路径
     * @默认值 `'/'`
     */
    fullPath?: string
  }
  interface layout {
    /**
     * 是否开启移动端适配，开启后当页面宽度小于 992px 时自动切换为移动端展示
     * @默认值 `false`
     */
    enableMobileAdaptation?: boolean
  }
  interface menu {
    /**
     * 导航栏数据来源，当 `app.routeBaseOn: 'filesystem'` 时生效
     * @默认值 `'frontend'` 前端
     * @可选值 `'backend'` 后端
     */
    baseOn?: 'frontend' | 'backend'
    /**
     * 导航栏模式
     * @默认值 `'side'` 侧边栏模式（有主导航）
     * @可选值 `'head'` 顶部模式
     * @可选值 `'single'` 侧边栏模式（无主导航）
     */
    mode?: 'side' | 'head' | 'single'
    /**
     * 切换主导航是否跳转页面
     * @默认值 `false`
     */
    switchMainMenuAndPageJump?: boolean
    /**
     * 次导航是否只保持一个子项的展开
     * @默认值 `true`
     */
    subMenuUniqueOpened?: boolean
    /**
     * 次导航是否收起
     * @默认值 `false`
     */
    subMenuCollapse?: boolean
    /**
     * 是否开启次导航的展开/收起按钮
     * @默认值 `false`
     */
    enableSubMenuCollapseButton?: boolean
    /**
     * 是否开启主导航切换快捷键
     * @默认值 `false`
     */
    enableHotkeys?: boolean
  }
  interface topbar {
    /**
     * 模式
     * @默认值 `'static'` 静止，跟随页面滚动
     * @可选值 `'fixed'` 固定，不跟随页面滚动，始终固定在顶部
     * @可选值 `'sticky'` 粘性，页面往下滚动时隐藏，往上滚动时显示
     */
    mode?: 'static' | 'fixed' | 'sticky'
  }
  interface tabbar {
    /**
     * 是否开启标签栏
     * @默认值 `false`
     */
    enable?: boolean
    /**
     * 是否开启标签栏图标显示
     * @默认值 `false`
     */
    enableIcon?: boolean
    /**
     * 是否开启标签栏快捷键
     * @默认值 `false`
     */
    enableHotkeys?: boolean
  }
  interface toolbar {
    /**
     * 是否开启面包屑导航
     * @默认值 `true`
     */
    breadcrumb?: boolean
    /**
     * 是否开启导航搜索
     * @默认值 `true`
     */
    navSearch?: boolean
    /**
     * 是否开启全屏
     * @默认值 `false`
     */
    fullscreen?: boolean
    /**
     * 是否开启页面刷新
     * @默认值 `false`
     */
    pageReload?: boolean
    /**
     * 是否开启颜色主题
     * @默认值 `false`
     */
    colorScheme?: boolean
  }
  interface mainPage {
    /**
     * 是否开启页面快捷键
     * @默认值 `true`
     */
    enableHotkeys?: boolean
  }
  interface navSearch {
    /**
     * 是否开启导航搜索快捷键
     * @默认值 `true`
     */
    enableHotkeys?: boolean
  }
  interface copyright {
    /**
     * 是否开启底部版权，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
     * @默认值 `false`
     */
    enable?: boolean
    /**
     * 网站运行日期
     * @默认值 `''`
     */
    dates?: string
    /**
     * 公司名称
     * @默认值 `''`
     */
    company?: string
    /**
     * 网站地址
     * @默认值 `''`
     */
    website?: string
    /**
     * 网站备案号
     * @默认值 `''`
     */
    beian?: string
  }
  interface all {
    /** 应用设置 */
    app?: app
    /** 主页设置 */
    home?: home
    /** 布局设置 */
    layout?: layout
    /** 导航栏设置 */
    menu?: menu
    /** 顶栏设置 */
    topbar?: topbar
    /** 标签栏设置 */
    tabbar?: tabbar
    /** 工具栏设置 */
    toolbar?: toolbar
    /** 页面设置 */
    mainPage?: mainPage
    /** 导航搜索设置 */
    navSearch?: navSearch
    /** 底部版权设置 */
    copyright?: copyright
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string | (() => string)
    icon?: string
    defaultOpened?: boolean
    auth?: string | string[]
    sidebar?: boolean
    menu?: boolean
    breadcrumb?: boolean
    activeMenu?: string
    cache?: boolean | string | string[]
    noCache?: string | string[]
    link?: string
    breadcrumbNeste?: Route.breadcrumb[]
  }
}

declare namespace Route {
  interface recordMainRaw {
    meta?: {
      title?: string | (() => string)
      icon?: string
      auth?: string | string[]
    }
    children: RouteRecordRaw[]
  }
  interface breadcrumb {
    path: string
    title?: string | (() => string)
    icon?: string
    hide: boolean
  }
}

declare namespace Menu {
  /** 原始 */
  interface recordRaw {
    path?: string
    meta?: {
      title?: string | (() => string)
      icon?: string
      defaultOpened?: boolean
      auth?: string | string[]
      menu?: boolean
      link?: string
    }
    children?: recordRaw[]
  }
  /** 主导航 */
  interface recordMainRaw {
    meta?: {
      title?: string | (() => string)
      icon?: string
      auth?: string | string[]
    }
    children: recordRaw[]
  }
}

declare namespace Tabbar {
  interface recordRaw {
    tabId: string
    fullPath: string
    title?: string | (() => string)
    icon?: string
    name: string[]
  }
}
