<template>
    <div class="breadcrumb-container">
        <div class="left-box">
            <div v-if="$store.state.global.enableSidebarCollapse" :class="{
                'sidebar-collapse': true,
                'is-collapse': $store.state.global.sidebarCollapse
            }" @click="$store.commit('global/toggleSidebarCollapse')"
            >
                <svg-icon name="collapse" />
            </div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <transition-group name="breadcrumb">
                    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>
        </div>
        <UserMenu />
    </div>
</template>

<script>
import UserMenu from '../UserMenu'

export default {
    name: 'Breadcrumb',
    components: {
        UserMenu
    },
    computed: {
        breadcrumbList() {
            let matched = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
            if (matched.length != 0) {
                if (this.$store.state.global.enableDashboard) {
                    if (!(matched[0].name == 'dashboard' && matched[0].path == '/dashboard')) {
                        matched = [{ path: '/dashboard', meta: { title: this.$store.state.global.dashboardTitle }}].concat(matched)
                    }
                }
            }
            return matched
        }
    }
}
</script>

<style lang="scss" scoped>
.breadcrumb-container {
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    left: 50%;
    width: calc(100% - #{$g_sidebar_width});
    transform: translateX(calc(-50% + #{$g_sidebar_width} * 0.5));
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $g-breadcrumb-height;
    background-color: #fff;
    transition: 0.3s;
    box-shadow: 0 0 1px 0 #ccc;
    &.shadow {
        box-shadow: 0 10px 10px -10px #ccc;
    }
    .left-box {
        display: flex;
        align-items: center;
        padding-right: 50px;
        overflow: hidden;
        mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);
        .sidebar-collapse {
            display: flex;
            align-items: center;
            padding: 0 20px;
            height: 50px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
                background-image: linear-gradient(to right, #ddd, transparent);
            }
            .svg-icon {
                transition: 0.3s;
            }
            &.is-collapse .svg-icon {
                transform: rotateZ(-180deg);
            }
            & + .el-breadcrumb {
                margin-left: 0;
            }
        }
        ::v-deep .el-breadcrumb {
            margin-left: 20px;
            white-space: nowrap;
            .el-breadcrumb__item {
                float: initial;
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
    transition: all 0.3s;
}
.breadcrumb-enter,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
}
.breadcrumb-leave-active {
    position: absolute;
}
</style>
