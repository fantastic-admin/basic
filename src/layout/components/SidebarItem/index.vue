<template>
    <div v-if="item.meta.sidebar !== false">
        <router-link v-if="!hasChildren" v-slot="{ href, navigate, isActive, isExactActive }" custom :to="resolvePath(item.path)">
            <a :href="isExternal(resolvePath(item.path)) ? resolvePath(item.path) : href" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" :target="isExternal(resolvePath(item.path)) ? '_blank' : '_self'" @click="navigate">
                <el-menu-item :title="item.meta.title" :index="resolvePath(item.path)">
                    <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                    <span>{{ item.meta.title }}</span>
                </el-menu-item>
            </a>
        </router-link>
        <el-submenu v-else :title="item.meta.title" :index="resolvePath(item.path)">
            <template slot="title">
                <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
                <span>{{ item.meta.title }}</span>
            </template>
            <SidebarItem v-for="route in item.children" :key="route.path" :item="route" :base-path="resolvePath(item.path)" />
        </el-submenu>
    </div>
</template>

<script>
import path from 'path'

export default {
    name: 'SidebarItem',
    props: {
        item: {
            type: Object,
            required: true
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },
    computed: {
        hasChildren() {
            let flag = true
            if (this.item.children) {
                if (this.item.children.every(item => item.meta.sidebar === false)) {
                    flag = false
                }
            } else {
                flag = false
            }
            return flag
        }
    },
    created() {},
    mounted() {},
    methods: {
        isExternal(path) {
            return /^(https?:|mailto:|tel:)/.test(path)
        },
        resolvePath(routePath) {
            if (this.isExternal(routePath)) {
                return routePath
            }
            if (this.isExternal(this.basePath)) {
                return this.basePath
            }
            return path.resolve(this.basePath, routePath)
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-menu-item,
::v-deep .el-menu-item span,
::v-deep .el-submenu__title,
::v-deep .el-submenu__title span {
    vertical-align: inherit;
    @include text-overflow;
}
::v-deep .el-submenu {
    .el-menu--inline {
        .el-submenu > .el-submenu__title,
        .el-menu-item {
            background-color: darken($g-sub-sidebar-bg, 7) !important;
            &:hover {
                background-color: darken($g-sub-sidebar-bg, 10) !important;
            }
        }
    }
}
::v-deep .el-menu-item.is-active,
::v-deep .el-submenu .el-menu--inline .el-menu-item.is-active {
    background-color: $g-sub-sidebar-menu-active-bg !important;
}
::v-deep .el-submenu,
::v-deep .el-menu-item {
    .svg-icon {
        font-size: 20px;
        margin-right: 10px;
        vertical-align: -0.25em;
        transition: all 0.3s;
    }
    &:hover > .svg-icon,
    .el-submenu__title:hover > .svg-icon {
        transform: scale(1.2);
    }
}
a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
}
</style>

<style lang="scss">
.el-menu--collapse .el-submenu.is-active > .el-submenu__title {
    color: $g-sub-sidebar-menu-active-color !important;
    background-color: $g-sub-sidebar-menu-active-bg !important;
}
</style>
