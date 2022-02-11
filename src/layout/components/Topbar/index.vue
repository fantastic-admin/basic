<script setup name="Topbar">
import { compile } from 'path-to-regexp'
import { deepClone } from '@/util'
import Tools from '../Tools/index.vue'

const route = useRoute()

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()

const enableSidebarCollapse = computed(() => {
    return settingsStore.mode === 'mobile' || (
        ['side', 'head', 'single'].includes(settingsStore.menu.menuMode) &&
        settingsStore.topbar.enableSidebarCollapse
    )
})

const breadcrumbList = computed(() => {
    let breadcrumbList = []
    if (settingsStore.dashboard.enable) {
        breadcrumbList.push({
            path: '/dashboard',
            title: settingsStore.dashboard.title
        })
    }
    if (route.meta.breadcrumbNeste) {
        breadcrumbList.push(...deepClone(route.meta.breadcrumbNeste))
    }
    return breadcrumbList
})

const scrollTop = ref(0)
onMounted(() => {
    window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})
function onScroll() {
    scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
}

function pathCompile(path) {
    let toPath = compile(path)
    return toPath(route.params)
}
</script>

<template>
    <div
        class="topbar-container" :class="{
            'fixed': settingsStore.topbar.fixed,
            'shadow': scrollTop
        }" data-fixed-calc-width
    >
        <div class="left-box">
            <div v-if="enableSidebarCollapse" class="sidebar-collapse" :class="{'is-collapse': settingsStore.menu.subMenuCollapse}" @click="settingsStore.toggleSidebarCollapse()">
                <svg-icon name="toolbar-collapse" />
            </div>
            <el-breadcrumb v-if="settingsStore.topbar.enableBreadcrumb && settingsStore.mode === 'pc'" separator-class="el-icon-arrow-right">
                <transition-group name="breadcrumb">
                    <template v-for="(item, index) in breadcrumbList">
                        <el-breadcrumb-item v-if="index < breadcrumbList.length - 1" :key="item.path" :to="pathCompile(item.path)">
                            {{ item.title }}
                        </el-breadcrumb-item>
                        <el-breadcrumb-item v-else :key="item.path">
                            {{ item.title }}
                        </el-breadcrumb-item>
                    </template>
                </transition-group>
            </el-breadcrumb>
        </div>
        <Tools />
    </div>
</template>

<style lang="scss" scoped>
.topbar-container {
    position: absolute;
    z-index: 999;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $g-topbar-height;
    background-color: #fff;
    transition: 0.3s, box-shadow 0.2s;
    box-shadow: 0 0 1px 0 #ccc;
    &.fixed {
        position: fixed;
        &.shadow {
            box-shadow: 0 10px 10px -10px #ccc;
        }
    }
    .left-box {
        display: flex;
        align-items: center;
        padding-right: 50px;
        overflow: hidden;
        /* stylelint-disable-next-line property-no-vendor-prefix */
        -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);
        .sidebar-collapse {
            display: flex;
            align-items: center;
            padding: 0 20px;
            height: 50px;
            cursor: pointer;
            transition: 0.3s;
            .svg-icon {
                transition: 0.3s;
            }
            &:hover .svg-icon {
                color: #5482ee;
            }
            &.is-collapse .svg-icon {
                transform: rotateZ(-180deg);
            }
            & + .el-breadcrumb {
                margin-left: 0;
            }
        }
        :deep(.el-breadcrumb) {
            margin-left: 20px;
            white-space: nowrap;
            .el-breadcrumb__item {
                display: inline-block;
                float: none;
                span {
                    font-weight: normal;
                }
                &:last-child span {
                    color: #97a8be;
                }
            }
        }
    }
}
// 面包屑动画
.breadcrumb-enter-active {
    transition: all 0.25s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(30px) skewX(-50deg);
}
</style>
