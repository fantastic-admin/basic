<script setup name="Layout">
import Header from './components/Header/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import Search from './components/Search/index.vue'
import AppSetting from './components/AppSetting/index.vue'
import { isExternalLink } from '@/util'

const { proxy } = getCurrentInstance()
const routeInfo = useRoute(), router = useRouter()

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useKeepAliveStore } from '@/store/modules/keepAlive'
const keepAliveStore = useKeepAliveStore()
import { useMenuStore } from '@/store/modules/menu'
const menuStore = useMenuStore()

const showCopyright = computed(() => {
    return typeof routeInfo.meta.copyright !== 'undefined' ? routeInfo.meta.copyright : settingsStore.copyright.enable
})

watch(() => settingsStore.menu.subMenuCollapse, val => {
    if (settingsStore.mode === 'mobile') {
        if (!val) {
            document.querySelector('body').classList.add('hidden')
        } else {
            document.querySelector('body').classList.remove('hidden')
        }
    }
})

watch(() => routeInfo.path, () => {
    if (settingsStore.mode === 'mobile') {
        settingsStore.$patch(state => {
            state.menu.subMenuCollapse = true
        })
    }
})

onMounted(() => {
    proxy.$hotkeys('f5', e => {
        if (settingsStore.topbar.enablePageReload) {
            e.preventDefault()
            reload()
        }
    })
})
provide('reload', reload)
function reload() {
    router.push({
        name: 'reload'
    })
}

provide('switchMenu', switchMenu)
function switchMenu(index) {
    menuStore.setActived(index)
    if (settingsStore.menu.switchMainMenuAndPageJump) {
        if (isExternalLink(menuStore.sidebarMenusFirstDeepestPath)) {
            window.open(menuStore.sidebarMenusFirstDeepestPath, '_blank')
        } else {
            router.push(menuStore.sidebarMenusFirstDeepestPath)
        }
    }
}
</script>

<template>
    <div class="layout">
        <div id="app-main">
            <Header />
            <div class="wrapper">
                <div class="sidebar-container" :class="{'show': settingsStore.mode === 'mobile' && !settingsStore.menu.subMenuCollapse}">
                    <MainSidebar />
                    <SubSidebar />
                </div>
                <div class="sidebar-mask" :class="{'show': settingsStore.mode === 'mobile' && !settingsStore.menu.subMenuCollapse}" @click="settingsStore.toggleSidebarCollapse()" />
                <div class="main-container" :style="{'padding-bottom': $route.meta.paddingBottom}">
                    <Topbar v-if="!(settingsStore.menu.menuMode === 'head' && !settingsStore.topbar.enableSidebarCollapse && !settingsStore.topbar.enableBreadcrumb)" />
                    <div class="main">
                        <router-view v-slot="{ Component, route }">
                            <transition name="main" mode="out-in" appear>
                                <!-- BUG https://github.com/vuejs/vue-next/issues/4984 -->
                                <keep-alive :include="[...keepAliveStore.list]">
                                    <component :is="Component" :key="route.fullPath" />
                                </keep-alive>
                            </transition>
                        </router-view>
                    </div>
                    <Copyright v-if="showCopyright" />
                </div>
            </div>
            <el-backtop :right="20" :bottom="20" title="回到顶部" />
        </div>
        <Search />
        <AppSetting />
    </div>
</template>

<style lang="scss" scoped>
[data-mode="mobile"] {
    .sidebar-container {
        transform: translateX(calc((var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)) * -1));
        &.show {
            transform: translateX(0);
        }
    }
    .main-container {
        margin-left: 0 !important;
    }
    &[data-menu-mode="single"] {
        .sidebar-container {
            transform: translateX(calc(var(--g-sub-sidebar-width) * -1));
            &.show {
                transform: translateX(0);
            }
        }
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
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: -1px 0 0 0 darken($g-main-bg, 10);
    .sidebar-container {
        position: fixed;
        z-index: 1010;
        top: 0;
        bottom: 0;
        display: flex;
        transition: transform 0.3s;
        width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    }
    .sidebar-mask {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0 0 0 / 50%);
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
    .main-sidebar-container + .sub-sidebar-container {
        left: var(--g-main-sidebar-width);
    }
    .main-container {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        transition: margin-left 0.3s;
        background-color: $g-main-bg;
        box-shadow: 1px 0 0 0 darken($g-main-bg, 10);
        margin-left: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
        .topbar-container {
            top: 0;
            z-index: 998;
        }
        .main {
            height: 100%;
            flex: auto;
            position: relative;
            overflow: hidden;
            transition: 0.3s;
        }
        .topbar-container + .main {
            margin: $g-topbar-height 0 0;
        }
    }
}
header + .wrapper {
    padding-top: $g-header-height;
    .sidebar-container {
        top: $g-header-height;
        :deep(.sidebar-logo) {
            display: none;
        }
        :deep(.el-menu) {
            padding-top: 0;
        }
    }
    .main-container {
        .topbar-container {
            top: $g-header-height;
            :deep(.tools) {
                display: none;
            }
        }
    }
}

// 主内容区动画
.main-enter-active {
    transition: 0.2s;
}
.main-leave-active {
    transition: 0.15s;
}
.main-enter-from {
    opacity: 0;
    margin-left: -20px;
}
.main-leave-to {
    opacity: 0;
    margin-left: 20px;
}
</style>
