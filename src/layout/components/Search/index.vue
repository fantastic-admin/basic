<template>
    <div id="search" :class="{'searching': isShow}" @click="isShow && $eventBus.$emit('global-search-toggle')">
        <div class="container">
            <div class="search-box" @click.stop>
                <el-input ref="input" v-model="search" prefix-icon="el-icon-search" placeholder="搜索页面" clearable @keydown.esc.native="$eventBus.$emit('global-search-toggle')" />
                <div class="tips">你可以使用快捷键<span>alt</span>+<span>s</span>唤醒搜索面板，按<span>esc</span>退出</div>
            </div>
            <div ref="search" class="result">
                <router-link v-for="item in resultList" :key="item.path" v-slot="{ href, navigate }" custom :to="isShow ? item.path : ''">
                    <a :href="isExternal(item.path) ? item.path : href" class="item" :target="isExternal(item.path) ? '_blank' : '_self'" @click="navigate">
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
            sourceList: []
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
                setTimeout(() => {
                    this.$refs.input.$el.children[0].focus()
                }, 100)
            } else {
                document.querySelector('body').classList.remove('hidden')
                setTimeout(() => {
                    this.search = ''
                }, 500)
            }
        }
    },
    created() {},
    mounted() {
        this.$eventBus.$on('global-search-toggle', () => {
            this.isShow = !this.isShow
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
                            breadcrumb: breadcrumb,
                            path: path,
                            isExternal: this.isExternal(item.path)
                        })
                    }
                }
            })
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
            ::v-deep .el-input__inner {
                height: 52px;
                line-height: 52px;
            }
            .tips {
                margin: 20px 0 40px;
                line-height: 24px;
                font-size: 14px;
                text-align: center;
                color: #fff;
                span {
                    margin: 0 5px;
                    padding: 1px 5px 2px;
                    border-radius: 5px;
                    font-weight: bold;
                    background-color: rgba($color: #000, $alpha: 0.5);
                }
            }
        }
        .result {
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
                &:hover {
                    transition: all 0.3s;
                    background-color: #f5f7fa;
                    .icon .svg-icon {
                        color: #409eff;
                        transform: scale(1.2);
                    }
                    .info {
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
