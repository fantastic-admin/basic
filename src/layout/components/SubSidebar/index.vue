<template>
    <div v-if="['side', 'head', 'single'].includes($store.state.settings.menuMode) || $store.state.settings.mode === 'mobile'" class="sub-sidebar-container" :class="{'is-collapse': $store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse}" @scroll="onSidebarScroll">
        <Logo :show-logo="$store.state.settings.menuMode === 'single'" :class="{
            'sidebar-logo': true,
            'sidebar-logo-bg': $store.state.settings.menuMode === 'single',
            'shadow': sidebarScrollTop
        }"
        />
        <!-- 侧边栏模式（无主导航） -->
        <el-menu :unique-opened="$store.state.settings.sidebarUniqueOpened" :default-openeds="$store.state.menu.defaultOpenedPaths" :default-active="$route.meta.activeMenu || $route.path" :collapse="$store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse" :collapse-transition="false" :class="{
            'is-collapse-without-logo': $store.state.settings.menuMode !== 'single' && $store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse
        }"
        >
            <transition-group name="sub-sidebar">
                <template v-for="route in $store.getters['menu/sidebarRoutes']">
                    <SidebarItem v-if="route.meta.sidebar !== false" :key="route.path" :item="route" :base-path="route.path" />
                </template>
            </transition-group>
        </el-menu>
    </div>
</template>

<script>
import Logo from '../Logo/index.vue'
import SidebarItem from '../SidebarItem/index.vue'

export default {
    name: 'SubSidebar',
    components: {
        Logo,
        SidebarItem
    },
    data() {
        return {
            sidebarScrollTop: 0
        }
    },
    methods: {
        onSidebarScroll(e) {
            this.sidebarScrollTop = e.target.scrollTop
        }
    }
}
</script>

<style lang="scss" scoped>
// 次侧边栏动画
.sub-sidebar-enter-active {
    transition: 0.3s;
}
.sub-sidebar-enter-from,
.sub-sidebar-leave-active {
    opacity: 0;
    transform: translateY(30px) skewY(10deg);
}
.sub-sidebar-leave-active {
    position: absolute;
}
.sub-sidebar-container {
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    // firefox隐藏滚动条
    scrollbar-width: none;
    // chrome隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    width: $g-sub-sidebar-width;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    transition: 0.3s;
    background-color: $g-sub-sidebar-bg;
    box-shadow: 10px 0 10px -10px darken($g-sub-sidebar-bg, 20);
    &.is-collapse {
        width: 64px;
        .sidebar-logo {
            &:not(.sidebar-logo-bg) {
                display: none;
            }
            :deep(span) {
                display: none;
            }
        }
    }
    .sidebar-logo {
        transition: box-shadow 0.2s, background-color 0.3s, color 0.3s;
        background-color: $g-sub-sidebar-bg;
        &:not(.sidebar-logo-bg) {
            :deep(span) {
                color: $g-sub-sidebar-menu-color;
            }
        }
        &.sidebar-logo-bg {
            background-color: $g-main-sidebar-bg;
        }
        &.shadow {
            box-shadow: 0 10px 10px -10px darken($g-sub-sidebar-bg, 20);
        }
    }
    .el-menu {
        border-right: 0;
        padding-top: $g-sidebar-logo-height;
        transition: border-color 0.3s, background-color 0.3s, color 0.3s;
        background-color: $g-sub-sidebar-bg;
        &:not(.el-menu--collapse) {
            width: inherit;
        }
        &.is-collapse-without-logo {
            padding-top: 0;
        }
        &.el-menu--collapse {
            :deep(.icon) {
                margin-right: 0;
            }
            :deep(.el-menu-item),
            :deep(.el-sub-menu__title) {
                span {
                    display: none;
                }
                .el-sub-menu__icon-arrow {
                    right: 7px;
                    margin-top: -5px;
                }
            }
        }
        &.menu-radius:not(.el-menu--collapse) {
            .sidebar-item {
                padding: 0 10px;
                &:first-child {
                    padding-top: 10px;
                }
                &:last-child {
                    padding-bottom: 10px;
                }
            }
            :deep(.el-menu--inline),
            :deep(.el-menu-item),
            :deep(.el-sub-menu__title) {
                border-radius: 10px;
            }
        }
    }
}
</style>
