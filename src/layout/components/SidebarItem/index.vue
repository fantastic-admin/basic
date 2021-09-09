<template>
    <div v-if="item.meta.sidebar !== false" class="sidebar-item">
        <el-sub-menu v-if="item.path == undefined" :title="item.meta.title" :index="item">
            <template #title>
                <svg-icon v-if="item.meta.icon" :name="item.meta.icon" class="icon" />
                <span class="title">{{ item.meta.title }}</span>
            </template>
            <SidebarItem v-for="route in item.children" :key="route.path" :item="route" />
        </el-sub-menu>
        <router-link v-else-if="!hasChildren" v-slot="{ href, navigate, isActive, isExactActive }" custom :to="resolvePath(item.path)">
            <a :href="isExternal(resolvePath(item.path)) ? resolvePath(item.path) : href" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" :target="isExternal(resolvePath(item.path)) ? '_blank' : '_self'" @click="navigate">
                <el-menu-item :title="item.meta.title" :index="resolvePath(item.path)">
                    <svg-icon v-if="iconName(isActive || isExactActive, item.meta.icon)" :name="iconName(isActive || isExactActive, item.meta.icon)" class="icon" />
                    <span class="title">{{ item.meta.title }}</span>
                </el-menu-item>
            </a>
        </router-link>
        <el-sub-menu v-else :title="item.meta.title" :index="resolvePath(item.path)">
            <template #title>
                <svg-icon v-if="item.meta.icon" :name="item.meta.icon" class="icon unactive" />
                <svg-icon v-if="item.meta.activeIcon || item.meta.icon" :name="item.meta.activeIcon || item.meta.icon" class="icon active" />
                <span class="title">{{ item.meta.title }}</span>
            </template>
            <SidebarItem v-for="route in item.children" :key="route.path" :item="route" :base-path="resolvePath(item.path)" />
        </el-sub-menu>
    </div>
</template>

<script setup>
import SidebarItem from './index.vue'
import path from 'path-browserify'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    basePath: {
        type: String,
        default: ''
    }
})

const hasChildren = computed(() => {
    let flag = true
    if (props.item.children) {
        if (props.item.children.every(item => item.meta.sidebar === false)) {
            flag = false
        }
    } else {
        flag = false
    }
    return flag
})

function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
function resolvePath(routePath) {
    if (isExternal(routePath)) {
        return routePath
    }
    if (isExternal(props.basePath)) {
        return props.basePath
    }
    return props.basePath ? path.resolve(props.basePath, routePath) : routePath
}
function iconName(isActive, icon) {
    let name = ''
    if (!isActive && icon) {
        name = icon
    }
    return name
}
</script>

<style lang="scss" scoped>
:deep(.el-menu-item),
:deep(.el-menu-item span.title),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu__title span.title) {
    flex: 1;
    vertical-align: inherit;
    @include text-overflow;
}
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
    display: flex;
    align-items: center;
}
:deep(.el-sub-menu),
:deep(.el-menu-item) {
    .icon {
        width: 20px;
        font-size: 20px;
        margin-right: 10px;
        vertical-align: -0.25em;
        transition: transform 0.3s;
        color: unset;
        &[class^=el-icon-],
        &[class*=" el-icon-"] {
            vertical-align: middle;
        }
    }
    &:hover > .icon,
    .el-sub-menu__title:hover > .icon {
        transform: scale(1.2);
    }
}
:deep(.el-sub-menu) {
    > .el-sub-menu__title > .icon.active {
        display: none;
    }
    &.is-active {
        > .el-sub-menu__title > .icon.unactive {
            display: none;
        }
        > .el-sub-menu__title > .icon.active {
            display: block;
        }
    }
}
a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
}
.el-sub-menu__title {
    > .badge {
        &-dot {
            right: 40px;
        }
        &-text {
            right: 40px;
        }
    }
}
</style>

<style lang="scss">
.el-menu--inline {
    background-color: $g-sub-sidebar-menu-bg !important;
    .el-menu-item,
    .el-sub-menu > .el-sub-menu__title {
        color: $g-sub-sidebar-menu-color;
        background-color: $g-sub-sidebar-menu-bg !important;
        &:hover {
            color: $g-sub-sidebar-menu-hover-color !important;
            background-color: $g-sub-sidebar-menu-hover-bg !important;
        }
    }
}
.el-menu-item,
.el-sub-menu__title {
    color: $g-sub-sidebar-menu-color !important;
    background: transparent !important;
    &:hover {
        color: $g-sub-sidebar-menu-hover-color !important;
        background-color: $g-sub-sidebar-menu-hover-bg !important;
    }
}
.el-menu-item.is-active,
.el-menu--collapse .el-sub-menu.is-active > .el-sub-menu__title,
.el-sub-menu .el-menu--inline .el-menu-item.is-active {
    color: $g-sub-sidebar-menu-active-color !important;
    background-color: $g-sub-sidebar-menu-active-bg !important;
    .icon,
    .el-sub-menu__icon-arrow {
        color: unset;
    }
}
</style>
