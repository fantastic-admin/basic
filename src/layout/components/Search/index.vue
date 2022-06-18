<script setup name="Search">
import { deepClone, isExternalLink } from '@/util'

const { proxy } = getCurrentInstance()

import useSettingsStore from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import useRouteStore from '@/store/modules/route'
const routeStore = useRouteStore()
import useMenuStore from '@/store/modules/menu'
const menuStore = useMenuStore()

const isShow = ref(false)
const searchInput = ref('')
const sourceList = ref([])
const actived = ref(-1)

const resultList = computed(() => {
    let result = []
    result = sourceList.value.filter(item => {
        let flag = false
        if (item.title.indexOf(searchInput.value) >= 0) {
            flag = true
        }
        if (item.path.indexOf(searchInput.value) >= 0) {
            flag = true
        }
        if (item.breadcrumb.some(b => b.indexOf(searchInput.value) >= 0)) {
            flag = true
        }
        return flag
    })
    return result
})

watch(() => isShow.value, val => {
    if (val) {
        document.querySelector('body').classList.add('hidden')
        proxy.$refs.search.scrollTop = 0
        // 当搜索显示的时候绑定上、下、回车快捷键，隐藏的时候再解绑。另外当 input 处于 focus 状态时，采用 vue 来绑定键盘事件
        proxy.$hotkeys('up', keyUp)
        proxy.$hotkeys('down', keyDown)
        proxy.$hotkeys('enter', keyEnter)
        setTimeout(() => {
            proxy.$refs.input.focus()
        }, 500)
    } else {
        document.querySelector('body').classList.remove('hidden')
        proxy.$hotkeys.unbind('up', keyUp)
        proxy.$hotkeys.unbind('down', keyDown)
        proxy.$hotkeys.unbind('enter', keyEnter)
        setTimeout(() => {
            searchInput.value = ''
            actived.value = -1
        }, 500)
    }
})
watch(() => resultList.value, () => {
    actived.value = -1
    handleScroll()
})

onMounted(() => {
    proxy.$eventBus.on('global-search-toggle', () => {
        isShow.value = !isShow.value
    })
    proxy.$hotkeys('alt+s', e => {
        if (settingsStore.topbar.enableNavSearch) {
            e.preventDefault()
            isShow.value = true
        }
    })
    proxy.$hotkeys('esc', e => {
        if (settingsStore.topbar.enableNavSearch) {
            e.preventDefault()
            isShow.value = false
        }
    })
    if (settingsStore.app.routeBaseOn !== 'filesystem') {
        routeStore.routes.map(item => {
            getSourceList(item.children)
        })
    } else {
        menuStore.menus.map(item => {
            getSourceList(item.children)
        })
    }
})

function hasChildren(item) {
    let flag = true
    if (item.children) {
        if (item.children.every(i => i.meta.sidebar === false)) {
            flag = false
        }
    } else {
        flag = false
    }
    return flag
}
function getSourceList(arr) {
    arr.map(item => {
        if (item.meta.sidebar !== false) {
            if (hasChildren(item)) {
                let baseBreadcrumb = item.meta.baseBreadcrumb ? deepClone(item.meta.baseBreadcrumb) : []
                baseBreadcrumb.push(item.meta.title)
                let child = deepClone(item.children)
                child.map(c => {
                    c.meta.baseIcon = item.meta.icon || item.meta.baseIcon
                    c.meta.baseBreadcrumb = baseBreadcrumb
                    c.meta.basePath = item.meta.basePath ? [item.meta.basePath, item.path].join('/') : item.path
                })
                getSourceList(child)
            } else {
                let breadcrumb = []
                if (item.meta.baseBreadcrumb) {
                    breadcrumb = deepClone(item.meta.baseBreadcrumb)
                }
                breadcrumb.push(item.meta.title)
                let path = ''
                if (isExternalLink(item.path)) {
                    path = item.path
                } else {
                    path = item.meta.basePath ? [item.meta.basePath, item.path].join('/') : item.path
                }
                sourceList.value.push({
                    icon: item.meta.icon || item.meta.baseIcon,
                    title: item.meta.title,
                    i18n: item.meta.i18n,
                    breadcrumb: breadcrumb,
                    path: path
                })
            }
        }
    })
}
function keyUp() {
    if (resultList.value.length) {
        actived.value -= 1
        if (actived.value < 0) {
            actived.value = resultList.value.length - 1
        }
        handleScroll()
    }
}
function keyDown() {
    if (resultList.value.length) {
        actived.value += 1
        if (actived.value > resultList.value.length - 1) {
            actived.value = 0
        }
        handleScroll()
    }
}
function keyEnter() {
    if (actived.value !== -1) {
        proxy.$refs[`search-item-${actived.value}`][0].click()
    }
}
function handleScroll() {
    let scrollTo = 0
    if (actived.value !== -1) {
        scrollTo = proxy.$refs['search'].scrollTop
        const activedOffsetTop = proxy.$refs[`search-item-${actived.value}`][0].offsetTop
        const activedClientHeight = proxy.$refs[`search-item-${actived.value}`][0].clientHeight
        const searchScrollTop = proxy.$refs['search'].scrollTop
        const searchClientHeight = proxy.$refs['search'].clientHeight
        if (activedOffsetTop + activedClientHeight > searchScrollTop + searchClientHeight) {
            scrollTo = activedOffsetTop + activedClientHeight - searchClientHeight
        } else if (activedOffsetTop <= searchScrollTop) {
            scrollTo = activedOffsetTop
        }
    }
    proxy.$refs['search'].scrollTo({
        top: scrollTo
    })
}
</script>

<template>
    <div id="search" :class="{'searching': isShow}" @click="isShow && $eventBus.emit('global-search-toggle')">
        <div class="container">
            <div class="search-box" @click.stop>
                <el-input ref="input" v-model="searchInput" placeholder="搜索页面，支持标题、URL模糊查询" clearable @keydown.esc="$eventBus.emit('global-search-toggle')" @keydown.up.prevent="keyUp" @keydown.down.prevent="keyDown" @keydown.enter.prevent="keyEnter">
                    <template #prefix>
                        <el-icon>
                            <svg-icon name="ep:search" />
                        </el-icon>
                    </template>
                </el-input>
                <div v-if="settingsStore.mode === 'pc'" class="tips">
                    <div class="tip">
                        <span>Alt</span>+<span>S</span>
                        唤醒搜索面板
                    </div>
                    <div class="tip">
                        <span>
                            <el-icon>
                                <svg-icon name="search-up" />
                            </el-icon>
                        </span>
                        <span>
                            <el-icon>
                                <svg-icon name="search-down" />
                            </el-icon>
                        </span>
                        切换搜索结果
                    </div>
                    <div class="tip">
                        <span>
                            <el-icon>
                                <svg-icon name="search-enter" />
                            </el-icon>
                        </span>
                        访问页面
                    </div>
                    <div class="tip">
                        <span>ESC</span>
                        退出
                    </div>
                </div>
            </div>
            <div ref="search" class="result" :class="{'mobile': settingsStore.mode === 'mobile'}">
                <router-link v-for="(item, index) in resultList" :key="item.path" v-slot="{ href, navigate }" custom :to="isShow ? item.path : ''">
                    <a :ref="`search-item-${index}`" :href="isExternalLink(item.path) ? item.path : href" class="item" :class="{'actived': index === actived}" :target="isExternalLink(item.path) ? '_blank' : '_self'" @click="navigate" @mouseover="actived = index">
                        <el-icon class="icon">
                            <svg-icon v-if="item.icon" :name="item.icon" />
                        </el-icon>
                        <div class="info">
                            <div class="title">
                                {{ item.title }}
                            </div>
                            <div class="breadcrumb">
                                <span v-for="(bc, bcIndex) in item.breadcrumb" :key="bcIndex">
                                    {{ bc }}
                                    <el-icon>
                                        <svg-icon name="ep:arrow-right" />
                                    </el-icon>
                                </span>
                            </div>
                            <div class="path">{{ item.path }}</div>
                        </div>
                    </a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#search {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--el-overlay-color-lighter);
    backdrop-filter: blur(10px);
    transition: all 0.2s;
    transform: translateZ(0);
    opacity: 0;
    visibility: hidden;
    &.searching {
        opacity: 1;
        visibility: visible;
        .container {
            transform: initial;
            filter: initial;
        }
    }
    .container {
        display: flex;
        flex-direction: column;
        max-width: 800px;
        height: 100%;
        margin: 0 auto;
        transition: all 0.2s;
        transform: scale(1.1);
        filter: blur(10px);
        .search-box {
            margin: 50px 20px 40px;
            :deep(.el-input__inner) {
                height: 52px;
                line-height: 52px;
            }
            :deep(.el-input__icon) {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .tips {
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                margin-top: 20px;
                line-height: 24px;
                font-size: 14px;
                color: #fff;
                span {
                    margin: 0 5px;
                    padding: 3px 8px 5px;
                    border-radius: 5px;
                    font-size: 12px;
                    font-weight: bold;
                    color: var(--el-text-color-primary);
                    background-color: var(--el-fill-color);
                    box-shadow: inset 0 -2px var(--el-fill-color-lighter), inset 0 0 1px 1px var(--el-fill-color-darker);
                }
            }
        }
        .result {
            position: relative;
            margin: 0 20px;
            max-height: calc(100% - 250px);
            border-radius: 5px;
            overflow: auto;
            background-color: var(--el-bg-color);
            box-shadow: 0 0 0 1px var(--el-border-color-darker);
            &.mobile {
                max-height: calc(100% - 200px);
            }
            .item {
                display: flex;
                align-items: center;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.3s;
                &.actived {
                    background-color: var(--el-bg-color-page);
                    .icon {
                        color: var(--el-color-primary);
                        transform: scale(1.2);
                    }
                    .info {
                        border-left-color: var(--el-border-color);
                        .title {
                            color: var(--el-text-color-primary);
                        }
                        .breadcrumb,
                        .path {
                            color: var(--el-text-color-regular);
                        }
                    }
                }
                .icon {
                    flex: 0 0 66px;
                    text-align: center;
                    color: var(--el-color-info);
                    font-size: 20px;
                    transition: all 0.3s;
                }
                .info {
                    flex: 1;
                    height: 70px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    border-left: 1px solid var(--el-border-color-lighter);
                    padding: 5px 10px 7px;
                    transition: all 0.3s;
                    @include text-overflow(1, true);
                    .title {
                        font-size: 18px;
                        font-weight: bold;
                        color: var(--el-text-color-regular);
                        @include text-overflow(1, true);
                    }
                    .breadcrumb,
                    .path {
                        font-size: 12px;
                        color: var(--el-text-color-secondary);
                        transition: all 0.3s;
                        @include text-overflow(1, true);
                    }
                    .breadcrumb {
                        span {
                            margin-right: 5px;
                            &:last-child i {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
