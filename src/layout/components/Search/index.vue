<template>
    <div id="search" :class="{'searching': isShow}" @click="isShow && $eventBus.emit('global-search-toggle')">
        <div class="container">
            <div class="search-box" @click.stop>
                <el-input ref="input" v-model="search" prefix-icon="el-icon-search" placeholder="搜索页面，支持标题、URL模糊查询" clearable @keydown.esc="$eventBus.emit('global-search-toggle')" @keydown.up.prevent="keyUp" @keydown.down.prevent="keyDown" @keydown.enter.prevent="keyEnter" />
                <div class="tips">
                    <div class="tip">
                        <span>Alt</span>+<span>S</span>
                        唤醒搜索面板
                    </div>
                    <div class="tip">
                        <span><svg-icon name="search-up" /></span>
                        <span><svg-icon name="search-down" /></span>
                        切换搜索结果
                    </div>
                    <div class="tip">
                        <span><svg-icon name="search-enter" /></span>
                        访问页面
                    </div>
                    <div class="tip">
                        <span>ESC</span>
                        退出
                    </div>
                </div>
            </div>
            <div ref="search" class="result">
                <router-link v-for="(item, index) in resultList" :key="item.path" v-slot="{ href, navigate }" custom :to="isShow ? item.path : ''">
                    <a :ref="`search-item-${index}`" :href="isExternal(item.path) ? item.path : href" class="item" :class="{'actived': index === actived}" :target="isExternal(item.path) ? '_blank' : '_self'" @click="navigate" @mouseover="actived = index">
                        <div class="icon">
                            <svg-icon v-if="item.icon" :name="item.icon" />
                        </div>
                        <div class="info">
                            <div class="title">
                                {{ item.title }}
                                <svg-icon v-if="item.isExternal" name="external-link" />
                            </div>
                            <div class="breadcrumb">
                                <span v-for="(bc, index) in item.breadcrumb" :key="index">
                                    {{ bc }}
                                    <i class="el-icon-arrow-right" />
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

<script>
import { deepClone } from '@/util'

export default {
    name: 'Search',
    props: {},
    data() {
        return {
            isShow: false,
            search: '',
            sourceList: [],
            actived: -1
        }
    },
    computed: {
        resultList() {
            let result = []
            result = this.sourceList.filter(item => {
                let flag = false
                if (item.title.indexOf(this.search) >= 0) {
                    flag = true
                }
                if (item.path.indexOf(this.search) >= 0) {
                    flag = true
                }
                if (item.breadcrumb.some(b => b.indexOf(this.search) >= 0)) {
                    flag = true
                }
                return flag
            })
            return result
        }
    },
    watch: {
        isShow(val) {
            if (val) {
                document.querySelector('body').classList.add('hidden')
                this.$refs.search.scrollTop = 0
                // 当搜索显示的时候绑定上、下、回车快捷键，隐藏的时候再解绑。另外当 input 处于 focus 状态时，采用 vue 来绑定键盘事件
                this.$hotkeys('up', this.keyUp)
                this.$hotkeys('down', this.keyDown)
                this.$hotkeys('enter', this.keyEnter)
                setTimeout(() => {
                    this.$refs.input.$el.children[0].focus()
                }, 100)
            } else {
                document.querySelector('body').classList.remove('hidden')
                this.$hotkeys.unbind('up', this.keyUp)
                this.$hotkeys.unbind('down', this.keyDown)
                this.$hotkeys.unbind('enter', this.keyEnter)
                setTimeout(() => {
                    this.search = ''
                    this.actived = -1
                }, 500)
            }
        },
        resultList() {
            this.actived = -1
            this.scrollTo(0)
        }
    },
    created() {},
    mounted() {
        this.$eventBus.on('global-search-toggle', () => {
            this.isShow = !this.isShow
        })
        this.$hotkeys('alt+s', e => {
            if (this.$store.state.settings.enableNavSearch) {
                e.preventDefault()
                this.isShow = true
            }
        })
        this.$store.state.menu.routes.map(item => {
            this.getSourceList(item.children)
        })
    },
    methods: {
        isExternal(path) {
            return /^(https?:|mailto:|tel:)/.test(path)
        },
        hasChildren(item) {
            let flag = true
            if (item.children) {
                if (item.children.every(i => i.meta.sidebar === false)) {
                    flag = false
                }
            } else {
                flag = false
            }
            return flag
        },
        getSourceList(arr) {
            arr.map(item => {
                if (item.meta.sidebar !== false) {
                    if (this.hasChildren(item)) {
                        let baseBreadcrumb = item.meta.baseBreadcrumb ? deepClone(item.meta.baseBreadcrumb) : []
                        baseBreadcrumb.push(item.meta.title)
                        let child = deepClone(item.children)
                        child.map(c => {
                            c.meta.baseIcon = item.meta.icon || item.meta.baseIcon
                            c.meta.baseBreadcrumb = baseBreadcrumb
                            c.meta.basePath = item.meta.basePath ? [item.meta.basePath, item.path].join('/') : item.path
                        })
                        this.getSourceList(child)
                    } else {
                        let breadcrumb = []
                        if (item.meta.baseBreadcrumb) {
                            breadcrumb = deepClone(item.meta.baseBreadcrumb)
                        }
                        breadcrumb.push(item.meta.title)
                        let path = ''
                        if (this.isExternal(item.path)) {
                            path = item.path
                        } else {
                            path = item.meta.basePath ? [item.meta.basePath, item.path].join('/') : item.path
                        }
                        this.sourceList.push({
                            icon: item.meta.icon || item.meta.baseIcon,
                            title: item.meta.title,
                            i18n: item.meta.i18n,
                            breadcrumb: breadcrumb,
                            path: path,
                            isExternal: this.isExternal(item.path)
                        })
                    }
                }
            })
        },
        keyUp() {
            if (this.resultList.length) {
                this.actived -= 1
                if (this.actived < 0) {
                    this.actived = this.resultList.length - 1
                }
                this.scrollTo(this.$refs[`search-item-${this.actived}`].offsetTop)
            }
        },
        keyDown() {
            if (this.resultList.length) {
                this.actived += 1
                if (this.actived > this.resultList.length - 1) {
                    this.actived = 0
                }
                this.scrollTo(this.$refs[`search-item-${this.actived}`].offsetTop)
            }
        },
        keyEnter() {
            if (this.actived !== -1) {
                this.$refs[`search-item-${this.actived}`].click()
            }
        },
        scrollTo(offsetTop) {
            if (this.actived !== -1) {
                if (
                    offsetTop + this.$refs[`search-item-${this.actived}`].clientHeight > this.$refs['search'].scrollTop + this.$refs['search'].clientHeight ||
                    offsetTop + this.$refs[`search-item-${this.actived}`].clientHeight <= this.$refs['search'].scrollTop
                ) {
                    this.$refs['search'].scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#search {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000, $alpha: 0.5);
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
            margin: 50px 20px 0;
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
                margin: 20px 0 40px;
                line-height: 24px;
                font-size: 14px;
                color: #fff;
                span {
                    margin: 0 5px;
                    padding: 3px 8px 5px;
                    border-radius: 5px;
                    font-size: 12px;
                    font-weight: bold;
                    color: #333;
                    background-color: rgba($color: #fff, $alpha: 0.8);
                    box-shadow: inset 0 -2px #505e5f, inset 0 0 1px 1px #dec6c6, 0 1px 2px 1px #acb0c166;
                }
            }
        }
        .result {
            position: relative;
            margin: 0 20px;
            max-height: calc(100% - 250px);
            border-radius: 5px;
            overflow: auto;
            background-color: #fff;
            .item {
                display: flex;
                align-items: center;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.3s;
                &.actived {
                    background-color: #dbe7f8;
                    .icon {
                        [class^=el-icon-],
                        [class^=ri-],
                        .svg-icon {
                            color: #409eff;
                            transform: scale(1.2);
                        }
                    }
                    .info {
                        border-left-color: #b7cafc;
                        .title {
                            color: #333;
                        }
                        .breadcrumb,
                        .path {
                            color: #606266;
                        }
                    }
                }
                .icon {
                    flex: 0 0 66px;
                    text-align: center;
                    [class^=el-icon-],
                    [class^=ri-],
                    .svg-icon {
                        color: #999;
                        font-size: 20px;
                        transition: all 0.3s;
                    }
                }
                .info {
                    flex: 1;
                    height: 70px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    border-left: 1px solid #ebeef5;
                    padding: 5px 10px 7px;
                    transition: all 0.3s;
                    @include text-overflow(1, true);
                    .title {
                        font-size: 18px;
                        font-weight: bold;
                        color: #666;
                        @include text-overflow(1, true);
                        .svg-icon {
                            font-size: 14px;
                        }
                    }
                    .breadcrumb,
                    .path {
                        font-size: 12px;
                        color: #c0c4cc;
                        transition: all 0.3s;
                        @include text-overflow(1, true);
                    }
                    .breadcrumb {
                        span:last-child i {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
