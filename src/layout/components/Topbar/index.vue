<template>
    <div class="topbar-container" :class="{
        'fixed': $store.state.settings.topbarFixed,
        'shadow': scrollTop
    }" data-fixed-calc-width
    >
        <div class="left-box">
            <div v-if="$store.state.settings.mode === 'mobile' || (['side', 'head', 'single'].includes($store.state.settings.menuMode) && $store.state.settings.enableSidebarCollapse)" class="sidebar-collapse" :class="{'is-collapse': $store.state.settings.sidebarCollapse}" @click="$store.commit('settings/toggleSidebarCollapse')">
                <svg-icon name="toolbar-collapse" />
            </div>
            <el-breadcrumb v-if="$store.state.settings.enableBreadcrumb && $store.state.settings.mode === 'pc'" separator-class="el-icon-arrow-right">
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
        <UserMenu />
    </div>
</template>

<script>
import { compile } from 'path-to-regexp'
import { deepClone } from '@/util'
import UserMenu from '../UserMenu/index.vue'

export default {
    name: 'Topbar',
    components: {
        UserMenu
    },
    data() {
        return {
            scrollTop: 0
        }
    },
    computed: {
        breadcrumbList() {
            let breadcrumbList = []
            if (this.$store.state.settings.enableDashboard) {
                breadcrumbList.push({
                    path: '/dashboard',
                    title: this.$store.state.settings.dashboardTitle
                })
            }
            if (this.$route.meta.breadcrumbNeste) {
                this.$route.meta.breadcrumbNeste.map((item, index) => {
                    let tmpItem = deepClone(item)
                    if (index != 0) {
                        tmpItem.path = `${this.$route.meta.breadcrumbNeste[0].path}/${item.path}`
                    }
                    breadcrumbList.push(tmpItem)
                })
            }
            return breadcrumbList
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
    },
    unmounted() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        pathCompile(path) {
            let toPath = compile(path)
            return toPath(this.$route.params)
        },
        onScroll() {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        }
    }
}
</script>

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
