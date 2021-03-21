<template>
    <div class="layout">
        <div id="app-main" :style="{
            '--real-sidebar-width': realSidebarWidth
        }"
        >
            <header v-if="$store.state.settings.mode == 'pc' && $store.state.settings.showHeader">
                <div class="header-container">
                    <div class="main">
                        <Logo />
                        <!-- 当头部导航大于 1 个的时候才会显示 -->
                        <div v-if="$store.state.menu.routes.length > 1" class="nav">
                            <template v-for="(item, index) in $store.state.menu.routes">
                                <div v-if="item.children && item.children.length !== 0" :key="index" :class="{
                                    'item': true,
                                    'active': index == $store.state.menu.headerActived
                                }" @click="$store.commit('menu/switchHeaderActived', index)"
                                >
                                    <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                                    <span v-if="item.meta.title">{{ item.meta.title }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                    <UserMenu />
                </div>
            </header>
            <div class="wrapper">
                <div :class="{
                    'sidebar-container': true,
                    'show': $store.state.settings.mode == 'mobile' && !$store.state.settings.sidebarCollapse
                }"
                >
                    <div v-if="(!$store.state.settings.showHeader || $store.state.settings.mode == 'mobile') && ($store.state.menu.routes.length > 1 || $store.state.settings.alwaysShowMainSidebar)" class="main-sidebar-container">
                        <Logo :show-title="false" class="sidebar-logo" />
                        <div class="nav">
                            <template v-for="(item, index) in $store.state.menu.routes">
                                <div v-if="item.children && item.children.length !== 0" :key="index" :class="{
                                    'item': true,
                                    'active': index == $store.state.menu.headerActived
                                }" :title="item.meta.title" @click="$store.commit('menu/switchHeaderActived', index)"
                                >
                                    <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                                    <span>{{ item.meta.title }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div :class="{
                        'sub-sidebar-container': true,
                        'is-collapse': $store.state.settings.mode == 'pc' && $store.state.settings.sidebarCollapse
                    }" @scroll="onSidebarScroll"
                    >
                        <Logo :show-logo="$store.state.menu.routes.length <= 1 && !$store.state.settings.alwaysShowMainSidebar" :class="{
                            'sidebar-logo': true,
                            'sidebar-logo-bg': $store.state.menu.routes.length <= 1 && !$store.state.settings.alwaysShowMainSidebar,
                            'shadow': sidebarScrollTop
                        }"
                        />
                        <el-menu :background-color="variables.g_sub_sidebar_bg" :text-color="variables.g_sub_sidebar_menu_color" :active-text-color="variables.g_sub_sidebar_menu_active_color" unique-opened :default-active="$route.meta.activeMenu || $route.path" :collapse="$store.state.settings.mode == 'pc' && $store.state.settings.sidebarCollapse" :collapse-transition="false" :class="{
                            'is-collapse-without-logo': $store.state.menu.routes.length > 1 && $store.state.settings.mode == 'pc' && $store.state.settings.sidebarCollapse
                        }"
                        >
                            <transition-group name="sidebar">
                                <template v-for="route in $store.getters['menu/sidebarRoutes']">
                                    <SidebarItem v-if="route.meta.sidebar !== false" :key="route.path" :item="route" :base-path="route.path" />
                                </template>
                            </transition-group>
                        </el-menu>
                    </div>
                </div>
                <div :class="{
                    'sidebar-mask': true,
                    'show': $store.state.settings.mode == 'mobile' && !$store.state.settings.sidebarCollapse
                }" @click="$store.commit('settings/toggleSidebarCollapse')"
                />
                <div class="main-container">
                    <Topbar :class="{'shadow': scrollTop}" />
                    <div class="main">
                        <transition name="main" mode="out-in">
                            <keep-alive v-if="isRouterAlive" :include="$store.state.keepAlive.list">
                                <RouterView :key="$route.path" />
                            </keep-alive>
                        </transition>
                    </div>
                    <Copyright v-if="$store.state.settings.showCopyright" />
                </div>
            </div>
            <el-backtop :right="20" :bottom="20" title="回到顶部" />
        </div>
        <Search />
        <ThemeSetting />
        <BuyIt />
    </div>
</template>

<script>
import variables from '@/assets/styles/resources/variables.scss'
import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
import SidebarItem from './components/SidebarItem'
import Topbar from './components/Topbar'
import Search from './components/Search'
import ThemeSetting from './components/ThemeSetting'
import BuyIt from './components/BuyIt'

export default {
    name: 'Layout',
    components: {
        Logo,
        Search,
        SidebarItem,
        Topbar,
        ThemeSetting,
        UserMenu,
        BuyIt
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true,
            routePath: '',
            sidebarScrollTop: 0,
            scrollTop: 0
        }
    },
    computed: {
        variables() {
            return variables
        },
        realSidebarWidth() {
            let realSidebarWidth = 0
            if (this.$store.state.settings.mode == 'pc') {
                if (!this.$store.state.settings.showHeader && (this.$store.state.menu.routes.length > 1 || this.$store.state.settings.alwaysShowMainSidebar)) {
                    realSidebarWidth = parseInt(variables.g_main_sidebar_width)
                }
                if (this.$store.state.settings.sidebarCollapse) {
                    realSidebarWidth += 64
                } else {
                    realSidebarWidth += parseInt(variables.g_sub_sidebar_width)
                }
            } else {
                realSidebarWidth = parseInt(variables.g_main_sidebar_width) + parseInt(variables.g_sub_sidebar_width)
            }
            return `${realSidebarWidth}px`
        }
    },
    watch: {
        $route: 'routeChange',
        '$store.state.settings.sidebarCollapse'(val) {
            if (this.$store.state.settings.mode == 'mobile') {
                if (!val) {
                    document.querySelector('body').classList.add('hidden')
                } else {
                    document.querySelector('body').classList.remove('hidden')
                }
            }
        }
    },
    mounted() {
        this.$hotkeys('alt+s', e => {
            if (this.$store.state.settings.enableNavSearch) {
                e.preventDefault()
                this.$eventBus.$emit('global-search-toggle')
            }
        })
        this.$hotkeys('f5', e => {
            if (this.$store.state.settings.enablePageReload) {
                e.preventDefault()
                this.reload(2)
            }
        })
        window.addEventListener('scroll', this.onScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        reload(type = 1) {
            if (type == 1) {
                this.isRouterAlive = false
                this.$nextTick(() => (this.isRouterAlive = true))
            } else {
                this.$router.push({
                    name: 'reload'
                })
            }
        },
        routeChange(newVal, oldVal) {
            if (newVal.name == oldVal.name) {
                this.reload()
            }
        },
        onSidebarScroll(e) {
            this.sidebarScrollTop = e.target.scrollTop
        },
        onScroll() {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        }
    }
}
</script>

<style lang="scss" scoped>
[data-mode=mobile] {
    .sidebar-container {
        transition: 0.3s;
        transform: translateX(calc(-1 * #{$g-sidebar-width}));
        &.show {
            transform: translateX(0);
        }
    }
    .main-container {
        margin-left: 0 !important;
    }
}
.layout {
    height: 100%;
}
#app-main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    transition: all 0.2s;
}
header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: $g-header-height;
    background-color: $g-header-bg;
    color: $g-header-menu-color;
    .header-container {
        width: $g-header-width;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .main {
            display: flex;
            align-items: center;
        }
    }
    @media screen and (max-width: $g-header-width) {
        .header-container {
            width: 100%;
        }
    }
    ::v-deep .title {
        position: relative;
        width: inherit;
        height: inherit;
        padding: inherit;
        background-color: inherit;
        .logo {
            width: 50px;
            height: 50px;
        }
        span {
            font-size: 24px;
            letter-spacing: 1px;
        }
    }
    .nav {
        display: flex;
        margin-left: 50px;
        .item {
            margin: 0 10px;
            padding: 10px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            &.active,
            &:hover {
                background-color: $g-header-menu-active-bg;
            }
            .svg-icon {
                font-size: 20px;
                & + span {
                    margin-left: 5px;
                }
            }
        }
    }
    ::v-deep .user {
        padding: 0;
        .user-container {
            color: #fff;
            font-size: 16px;
        }
    }
}
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .sidebar-container {
        position: fixed;
        z-index: 1010;
        top: 0;
        bottom: 0;
        display: flex;
        width: var(--real-sidebar-width);
    }
    .sidebar-mask {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.5);
        backdrop-filter: blur(2px);
        transition: all 0.2s;
        transform: translateZ(0);
        opacity: 0;
        visibility: hidden;
        &.show {
            opacity: 1;
            visibility: visible;
        }
    }
    .main-sidebar-container,
    .sub-sidebar-container {
        transition: 0.3s;
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        // firefox隐藏滚动条
        scrollbar-width: none;
        // chrome隐藏滚动条
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .main-sidebar-container {
        width: $g-main-sidebar-width;
        background-color: $g-main-sidebar-bg;
        color: #fff;
        .sidebar-logo {
            transition: 0.3s;
            background-color: $g-main-sidebar-bg;
        }
        .nav {
            width: inherit;
            padding-top: $g-sidebar-logo-height;
            .item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 60px;
                padding: 0 5px;
                cursor: pointer;
                transition: 0.3s;
                &.active,
                &:hover {
                    background-color: $g-main-sidebar-menu-active-bg;
                }
                .svg-icon {
                    margin: 0 auto;
                    font-size: 20px;
                }
                span {
                    text-align: center;
                    font-size: 14px;
                    @include text-overflow;
                }
            }
        }
    }
    .sub-sidebar-container {
        width: $g-sub-sidebar-width;
        background-color: $g-sub-sidebar-bg;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        box-shadow: 10px 0 10px -10px darken($g-sub-sidebar-bg, 20);
        &.is-collapse {
            width: 64px;
            .sidebar-logo {
                &:not(.sidebar-logo-bg) {
                    display: none;
                }
                ::v-deep span {
                    display: none;
                }
            }
        }
        .sidebar-logo {
            background: $g-sub-sidebar-bg;
            transition: box-shadow 0.2s, background-color 0.3s, color 0.3s;
            &:not(.sidebar-logo-bg) {
                ::v-deep span {
                    color: $g-sub-sidebar-menu-color;
                }
            }
            &.sidebar-logo-bg {
                background: $g-main-sidebar-bg;
            }
            &.shadow {
                box-shadow: 0 10px 10px -10px darken($g-sub-sidebar-bg, 20);
            }
        }
        .el-menu {
            border-right: 0;
            padding-top: $g-sidebar-logo-height;
            transition: border-color 0.3s, background-color 0.3s, color 0.3s;
            &:not(.el-menu--collapse) {
                width: inherit;
            }
            &.is-collapse-without-logo {
                padding-top: 0;
            }
            &.el-menu--collapse {
                ::v-deep .svg-icon {
                    margin-right: 0;
                }
                ::v-deep .el-menu-item,
                ::v-deep .el-submenu__title {
                    span {
                        display: none;
                    }
                    i {
                        right: 7px;
                        margin-top: -5px;
                    }
                }
            }
        }
    }
    .main-sidebar-container + .sub-sidebar-container {
        left: $g-main-sidebar-width;
    }
    .main-container {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        margin-left: $g-sidebar-width;
        background-color: #f5f7f9;
        box-shadow: 1px 0 0 0 darken($g-main-bg, 10);
        transition: 0.3s;
        .main {
            height: 100%;
            flex: auto;
            position: relative;
            padding: $g-topbar-height 0 0;
            overflow: hidden;
        }
    }
}
header + .wrapper {
    padding-top: $g-header-height;
    .sidebar-container {
        top: $g-header-height;
        .sidebar-logo {
            display: none;
        }
        .el-menu {
            padding-top: 0;
        }
    }
    .main-container {
        .topbar-container {
            top: $g-header-height;
            ::v-deep .user {
                display: none;
            }
        }
    }
}

// 侧边栏动画
.sidebar-enter-active {
    transition: all 0.2s;
}
.sidebar-enter,
.sidebar-leave-active {
    opacity: 0;
    transform: translateY(20px);
}
.sidebar-leave-active {
    position: absolute;
}

// 主内容区动画
.main-enter-active {
    transition: all 0.2s;
}
.main-leave-active {
    transition: all 0.15s;
}
.main-enter {
    opacity: 0;
    margin-left: -20px;
}
.main-leave-to {
    opacity: 0;
    margin-left: 20px;
}
</style>
