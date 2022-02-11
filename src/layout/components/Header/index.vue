<script setup name="Header">
import Logo from '../Logo/index.vue'
import Tools from '../Tools/index.vue'

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useMenuStore } from '@/store/modules/menu'
const menuStore = useMenuStore()

const switchMenu = inject('switchMenu')
</script>

<template>
    <transition name="header">
        <header v-if="settingsStore.mode === 'pc' && settingsStore.menu.menuMode === 'head'">
            <div class="header-container">
                <div class="main">
                    <Logo />
                    <!-- 顶部模式 -->
                    <div class="nav">
                        <template v-for="(item, index) in menuStore.allMenus">
                            <div v-if="item.children && item.children.length !== 0" :key="index" class="item" :class="{'active': index == menuStore.actived}" @click="switchMenu(index)">
                                <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                                <span v-if="item.meta.title">{{ item.meta.title }}</span>
                            </div>
                        </template>
                    </div>
                </div>
                <Tools />
            </div>
        </header>
    </transition>
</template>

<style lang="scss" scoped>
// 头部动画
.header-enter-active {
    transition: 0.2s;
}
.header-enter-from {
    transform: translateY(-#{$g-header-height});
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
    color: $g-header-color;
    background-color: $g-header-bg;
    .header-container {
        width: $g-header-width;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .main {
            display: flex;
            align-items: center;
            height: 100%;
        }
    }
    @media screen and (max-width: $g-header-width) {
        .header-container {
            width: 100%;
        }
    }
    :deep(.title) {
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
            color: $g-header-color;
        }
    }
    .nav {
        display: flex;
        height: 100%;
        margin-left: 50px;
        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 5px;
            width: 80px;
            cursor: pointer;
            transition: all 0.3s;
            background-color: $g-header-bg;
            color: $g-header-menu-color;
            &:hover {
                color: $g-header-menu-hover-color;
                background-color: $g-header-menu-hover-bg;
            }
            &.active {
                color: $g-header-menu-active-color;
                background-color: $g-header-menu-active-bg;
            }
            .svg-icon {
                font-size: 24px;
                vertical-align: middle;
                & + span {
                    vertical-align: middle;
                    @include text-overflow(1, false);
                }
            }
        }
    }
    :deep(.tools) {
        padding: 0;
        .user-container {
            font-size: 16px;
            color: $g-header-color;
        }
    }
}
</style>
