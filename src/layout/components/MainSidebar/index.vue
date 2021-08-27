<template>
    <transition name="main-sidebar">
        <div v-if="$store.state.settings.menuMode === 'side' || $store.state.settings.mode === 'mobile'" class="main-sidebar-container">
            <Logo :show-title="false" class="sidebar-logo" />
            <!-- 侧边栏模式（含主导航） -->
            <div class="nav">
                <template v-for="(item, index) in $store.getters['menu/routes']">
                    <div v-if="item.children && item.children.length !== 0" :key="index" :class="{
                        'item': true,
                        'active': index === $store.state.menu.headerActived
                    }" :title="item.meta.title" @click="switchMenu(index)"
                    >
                        <svg-icon v-if="item.meta.icon" :name="item.meta.icon" class="icon" />
                        <span>{{ item.meta.title }}</span>
                    </div>
                </template>
            </div>
        </div>
    </transition>
</template>

<script>
import Logo from '../Logo/index.vue'

export default {
    name: 'MainSidebar',
    components: {
        Logo
    },
    inject: ['switchMenu']
}
</script>

<style lang="scss" scoped>
// 主侧边栏动画
.main-sidebar-enter-active {
    transition: 0.3s;
}
.main-sidebar-enter-from {
    transform: translateX(-#{$g-main-sidebar-width});
}
.main-sidebar-container {
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    // firefox隐藏滚动条
    scrollbar-width: none;
    // chrome隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    position: relative;
    z-index: 1;
    width: $g-main-sidebar-width;
    color: $g-main-sidebar-menu-color;
    background-color: $g-main-sidebar-bg;
    .sidebar-logo {
        transition: 0.3s;
        background-color: $g-main-sidebar-bg;
    }
    .nav {
        width: inherit;
        padding-top: $g-sidebar-logo-height;
        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            height: 60px;
            padding: 0 5px;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
                color: $g-main-sidebar-menu-hover-color;
                background-color: $g-main-sidebar-menu-hover-bg;
            }
            &.active {
                color: $g-main-sidebar-menu-active-color;
                background-color: $g-main-sidebar-menu-active-bg;
            }
            .icon {
                margin: 0 auto;
                font-size: 24px;
            }
            span {
                text-align: center;
                font-size: 14px;
                @include text-overflow(1, false);
            }
        }
    }
}
</style>
