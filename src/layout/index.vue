<template>
    <div class="layout">
        <div id="app-main" :style="{
            '--real-sidebar-width': realSidebarWidth
        }"
        >
            <header v-if="$store.state.global.showHeader">
                <div class="header-container">
                    <div class="main">
                        <Logo />
                        <!-- 当头部导航大于 1 个的时候才会显示 -->
                        <div v-if="$store.state.global.allRoutes.length > 1" class="nav">
                            <template v-for="(item, index) in $store.state.global.allRoutes">
                                <div v-if="item.children && item.children.length !== 0" :key="index" :class="{
                                    'item': true,
                                    'active': index == $store.state.global.headerNavActive
                                }" @click="$store.commit('global/switchHeader', index)"
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
                <div class="sidebar-container">
                    <div v-if="!$store.state.global.showHeader && $store.state.global.allRoutes.length > 1" class="main-sidebar-container">
                        <Logo :show-title="false" class="sidebar-logo" />
                        <div class="nav">
                            <template v-for="(item, index) in $store.state.global.allRoutes">
                                <div v-if="item.children && item.children.length !== 0" :key="index" :class="{
                                    'item': true,
                                    'active': index == $store.state.global.headerNavActive
                                }" :title="item.meta.title" @click="$store.commit('global/switchHeader', index)"
                                >
                                    <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                                    <span>{{ item.meta.title }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div :class="{
                        'sub-sidebar-container': true,
                        'is-collapse': $store.state.global.sidebarCollapse
                    }" @scroll="onSidebarScroll"
                    >
                        <Logo :show-logo="$store.state.global.allRoutes.length <= 1" :class="{
                            'sidebar-logo': true,
                            'sidebar-logo-bg': $store.state.global.allRoutes.length <= 1,
                            'shadow': sidebarScrollTop
                        }"
                        />
                        <el-menu :background-color="variables.g_sub_sidebar_bg" :text-color="variables.g_sub_sidebar_menu_color" :active-text-color="variables.g_sub_sidebar_menu_active_color" unique-opened :default-active="$route.meta.activeMenu || $route.path" :collapse="$store.state.global.sidebarCollapse" :collapse-transition="false" :class="{
                            'is-collapse-without-logo': $store.state.global.allRoutes.length > 1 && $store.state.global.sidebarCollapse
                        }"
                        >
                            <transition-group name="sidebar">
                                <SidebarItem v-for="route in $store.state.global.sidebarRoutes" :key="route.path" :item="route" :base-path="route.path" />
                            </transition-group>
                        </el-menu>
                    </div>
                </div>
                <div class="main-container">
                    <Breadcrumb :class="{'shadow': scrollTop}" />
                    <div class="main">
                        <transition name="main" mode="out-in">
                            <keep-alive :include="$store.state.keepAlive.list">
                                <RouterView :key="$route.path" />
                            </keep-alive>
                        </transition>
                    </div>
                    <Copyright v-if="$store.state.global.showCopyright" />
                </div>
            </div>
            <el-backtop :right="20" :bottom="20" title="回到顶部" />
        </div>
        <SearchSidebar />
        <ThemeSetting />
    </div>
</template>

<script>
import variables from '@/assets/styles/resources/variables.scss'
import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
import SidebarItem from './components/SidebarItem'
import Breadcrumb from './components/Breadcrumb'
import SearchSidebar from './components/SearchSidebar'
import ThemeSetting from './components/ThemeSetting'

export default {
    name: 'Layout',
    components: {
        Logo, SearchSidebar, SidebarItem, Breadcrumb, ThemeSetting, UserMenu
    },
    inject: ['reload'],
    data() {
        return {
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
            if (!this.$store.state.global.showHeader && this.$store.state.global.allRoutes.length > 1) {
                realSidebarWidth = parseInt(variables.g_main_sidebar_width)
            }
            if (this.$store.state.global.sidebarCollapse) {
                realSidebarWidth += 64
            } else {
                realSidebarWidth += parseInt(variables.g_sub_sidebar_width)
            }
            return `${realSidebarWidth}px`
        }
    },
    mounted() {
        this.$hotkeys('alt+s', e => {
            if (this.$store.state.global.enableNavSearch) {
                e.preventDefault()
                this.$store.commit('global/toggleSearch')
            }
        })
        this.$hotkeys('f5', e => {
            if (this.$store.state.global.enablePageReload) {
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
        z-index: 1000;
        top: 0;
        bottom: 0;
        display: flex;
        width: var(--real-sidebar-width);
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
            background-color: $g-main-sidebar-bg;
        }
        .nav {
            width: inherit;
            padding-top: $g-breadcrumb-height;
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
            transition: box-shadow 0.5s;
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
            padding-top: $g-breadcrumb-height;
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
            padding: $g_breadcrumb_height 0 0;
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
        .breadcrumb-container {
            top: $g-header-height;
            ::v-deep .user {
                display: none;
            }
        }
    }
}

// 侧边栏动画
.sidebar-enter-active {
    transition: all 0.3s;
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
.main-enter-active,
.main-leave-active {
    transition: all 0.3s;
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
