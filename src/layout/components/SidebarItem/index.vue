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
                    <svg-icon v-if="iconName(isActive || isExactActive, item.meta.icon, item.meta.activeIcon)" :name="iconName(isActive || isExactActive, item.meta.icon, item.meta.activeIcon)" class="icon" />
                    <span class="title">{{ item.meta.title }}</span>
                    <span v-if="badge(item.meta.badge).visible" :class="{
                        'badge': true,
                        'badge-dot': badge(item.meta.badge).type === 'dot',
                        'badge-text': badge(item.meta.badge).type === 'text'
                    }"
                    >{{ badge(item.meta.badge).type === 'text' ? badge(item.meta.badge).value : '' }}</span>
                </el-menu-item>
            </a>
        </router-link>
        <el-sub-menu v-else :title="item.meta.title" :index="resolvePath(item.path)">
            <template #title>
                <svg-icon v-if="item.meta.icon" :name="item.meta.icon" class="icon unactive" />
                <svg-icon v-if="item.meta.activeIcon || item.meta.icon" :name="item.meta.activeIcon || item.meta.icon" class="icon active" />
                <span class="title">{{ item.meta.title }}</span>
                <span v-if="badge(item.meta.badge).visible" :class="{
                    'badge': true,
                    'badge-dot': badge(item.meta.badge).type === 'dot',
                    'badge-text': badge(item.meta.badge).type === 'text'
                }"
                >{{ badge(item.meta.badge).type === 'text' ? badge(item.meta.badge).value : '' }}</span>
            </template>
            <SidebarItem v-for="route in item.children" :key="route.path" :item="route" :base-path="resolvePath(item.path)" />
        </el-sub-menu>
    </div>
</template>

<script>
import path from 'path-browserify'

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
            return this.basePath ? path.resolve(this.basePath, routePath) : routePath
        },
        iconName(isActive, icon, activeIcon) {
            let name = ''
            if ((!isActive && icon) || (isActive && !activeIcon)) {
                name = icon
            } else if (isActive && activeIcon) {
                name = activeIcon
            }
            return name
        },
        badge(badge) {
            let res = {
                type: '', // text or dot
                value: '',
                visible: false
            }
            if (badge) {
                res.visible = true
                res.value = typeof badge == 'function' ? badge() : badge
                if (typeof res.value == 'boolean') {
                    res.type = 'dot'
                    if (!res.value) {
                        res.visible = false
                    }
                } else if (typeof res.value == 'number') {
                    res.type = 'text'
                    if (res.value <= 0) {
                        res.visible = false
                    }
                } else {
                    res.type = 'text'
                    if (!res.value) {
                        res.visible = false
                    }
                }
            }
            return res
        }
    }
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
.badge {
    position: absolute;
    z-index: 1;
    background-color: $g-badge-bg;
    box-shadow: 0 0 0 1px $g-badge-border-color;
    @include position-center(y);
    &-dot {
        right: 15px;
        border-radius: 50%;
        width: 6px;
        height: 6px;
        &::after {
            content: '';
            pointer-events: none;
            position: absolute;
            top: 0;
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            animation: dot-twinkling 1s infinite ease-in-out;
            background-color: $g-badge-bg;
        }
    }
    @keyframes dot-twinkling {
        0% {
            opacity: 0.6;
            transform: scale(0.8);
        }
        100% {
            opacity: 0;
            transform: scale(2.4);
        }
    }
    &-text {
        right: 15px;
        border-radius: 10px;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;
        color: $g-badge-color;
    }
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
