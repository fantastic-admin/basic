let globalSettings = {
    /**
     * 是否开启权限功能，权限功能提供以下鉴权支持：
     * 1、路由鉴权
     * 2、鉴权组件：<Auth></Auth>、<AuthAll></AuthAll>
     * 3、鉴权指令：v-auth、v-auth-all
     * 4、鉴权函数：this.$auth()、this.$authAll()
     */
    enablePermission: false,
    /**
     * 导航栏模式
     * side 侧边栏模式（含主导航）
     * head 顶部模式
     * single 侧边栏模式（无主导航）
     */
    menuMode: 'side',
    // Element 组件默认尺寸，支持：large、medium、small、mini
    elementSize: 'large',
    // 是否开启侧边栏展开收起按钮
    enableSidebarCollapse: false,
    // 侧边栏是否收起
    sidebarCollapse: false,
    // 切换侧边栏同时跳转页面
    switchSidebarAndPageJump: false,
    // 侧边栏只保持一个子菜单的展开
    sidebarUniqueOpened: true,
    // 顶栏（顶部导航栏和标签栏）是否固定
    topbarFixed: true,
    // 是否开启面包屑导航
    enableBreadcrumb: true,
    // 是否显示底部版权信息，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
    showCopyright: true,
    // 版权信息配置，格式为：Copyright © [dates] <company>, All Rights Reserved
    copyrightDates: '2020-2021',
    copyrightCompany: 'Fantastic-admin',
    copyrightWebsite: 'https://hooray.github.io/fantastic-admin',
    // 是否开启导航搜索
    enableNavSearch: true,
    // 是否开启移动端适配，开启后当页面宽度小于 992px 时自动切换为移动端展示
    enableMobileAdaptation: true,
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
    // 控制台名称
    dashboardTitle: '控制台',
    // 是否开启后端返回路由数据
    enableBackendReturnRoute: false,
    // 是否开启主题配置（建议在生产环境关闭）
    enableThemeSetting: true
}

export default globalSettings
