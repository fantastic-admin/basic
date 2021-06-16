let globalSettings = {
    /**
     * 是否开启权限功能，权限功能提供以下鉴权支持：
     * 1、路由鉴权
     * 2、鉴权组件：<Auth></Auth>、<AuthAll></AuthAll>
     * 3、鉴权指令：v-auth、v-auth-all
     * 4、鉴权函数：this.$auth()、this.$authAll()
     */
    openPermission: false,
    // 是否显示头部
    showHeader: false,
    // 是否始终显示主侧边栏，设置为 false 且主侧边栏里只有一个导航时，主侧边栏会自动隐藏
    alwaysShowMainSidebar: false,
    // 是否开启侧边栏展开收起按钮
    enableSidebarCollapse: false,
    // 侧边栏是否收起
    sidebarCollapse: false,
    // 是否显示底部版权信息，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
    showCopyright: true,
    // 版权信息配置，格式为：Copyright © [dates] <company>
    copyrightDates: '2021',
    copyrightCompany: 'Fantastic-admin',
    copyrightWebsite: 'https://hooray.github.io/fantastic-admin',
    // 是否开启导航搜索
    enableNavSearch: true,
    // 是否开启全屏
    enableFullscreen: false,
    // 是否开启页面刷新
    enablePageReload: false,
    // 是否开启载入进度条
    enableProgress: true,
    // 是否开启动态标题
    enableDynamicTitle: false,
    // 是否开启控制台
    enableDashboard: true,
    // 是否开启扁平化路由，开启后三级以及三级以上的嵌套路由均为被处理成二级，但侧边栏导航的层级效果不变
    enableFlatRoutes: false,
    // 控制台名称
    dashboardTitle: '控制台',
    // 是否开启主题配置（建议在生产环境关闭）
    enableThemeSetting: true
}

// 演示&开发环境开启全部功能（这部分代码可删除，仅方便作者打包演示环境）
if (process.env.VUE_APP_TYPE == 'example' || process.env.NODE_ENV == 'development') {
    globalSettings.openPermission = true
    globalSettings.enableSidebarCollapse = true
    globalSettings.enableFullscreen = true
    globalSettings.enablePageReload = true
    globalSettings.enableDynamicTitle = true
    if (process.env.VUE_APP_TYPE == 'example') {
        globalSettings.copyrightWebsite = '/fantastic-admin'
    }
}

export default globalSettings
