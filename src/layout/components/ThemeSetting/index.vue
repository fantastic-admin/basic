<template>
    <div>
        <el-drawer v-model="isShow" title="主题配置" direction="rtl" :size="300">
            <el-alert title="主题配置可实时预览效果，更多设置请在 src/settings.js 中进行设置，建议在生产环境隐藏主题配置功能" type="error" :closable="false" />
            <el-divider v-if="$store.state.settings.mode === 'pc'">导航栏模式</el-divider>
            <div v-if="$store.state.settings.mode === 'pc'" class="menu-mode">
                <el-tooltip content="侧边栏模式（含主导航）" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-side" :class="{'active': menuMode === 'side'}" @click="menuMode = 'side'">
                        <svg-icon name="el-icon-check" />
                    </div>
                </el-tooltip>
                <el-tooltip content="顶部模式" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-head" :class="{'active': menuMode === 'head'}" @click="menuMode = 'head'">
                        <svg-icon name="el-icon-check" />
                    </div>
                </el-tooltip>
                <el-tooltip content="侧边栏模式（不含主导航）" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-single" :class="{'active': menuMode === 'single'}" @click="menuMode = 'single'">
                        <svg-icon name="el-icon-check" />
                    </div>
                </el-tooltip>
            </div>
            <el-divider>侧边栏</el-divider>
            <div v-if="$store.state.settings.mode === 'pc'" class="setting-item">
                <div class="label">折叠按钮</div>
                <el-switch v-model="enableSidebarCollapse" />
            </div>
            <div class="setting-item">
                <div class="label">是否折叠</div>
                <el-switch v-model="sidebarCollapse" />
            </div>
            <div class="setting-item">
                <div class="label">
                    切换跳转
                    <el-tooltip content="开启该功能后，切换侧边栏时，页面自动跳转至该侧边栏导航下第一个路由地址" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question" />
                    </el-tooltip>
                </div>
                <el-switch v-model="switchSidebarAndPageJump" :disabled="['single'].includes($store.state.settings.menuMode)" />
            </div>
            <div class="setting-item">
                <div class="label">
                    保持展开一个
                    <el-tooltip content="开启该功能后，侧边栏只保持一个子菜单的展开" placement="top" :append-to-body="false">
                        <svg-icon name="ri-question-line" />
                    </el-tooltip>
                </div>
                <el-switch v-model="sidebarUniqueOpened" />
            </div>
            <el-divider>顶栏</el-divider>
            <div class="setting-item">
                <div class="label">
                    顶栏固定
                    <el-tooltip content="包含顶部导航栏和标签栏" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question" />
                    </el-tooltip>
                </div>
                <el-switch v-model="topbarFixed" />
            </div>
            <div v-if="$store.state.settings.mode === 'pc'" class="setting-item">
                <div class="label">面包屑导航</div>
                <el-switch v-model="enableBreadcrumb" />
            </div>
            <el-divider>功能按钮</el-divider>
            <div class="setting-item">
                <div class="label">
                    导航栏搜索
                    <el-tooltip content="对导航栏进行快捷搜索" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableNavSearch" />
            </div>
            <div v-if="$store.state.settings.mode === 'pc'" class="setting-item">
                <div class="label">
                    全屏
                    <el-tooltip content="该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableFullscreen" />
            </div>
            <div class="setting-item">
                <div class="label">
                    页面刷新
                    <el-tooltip content="开启时会阻止原生 F5 键刷新功能，并采用框架提供的刷新模式进行页面刷新" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enablePageReload" />
            </div>
            <el-divider>其它</el-divider>
            <div class="setting-item">
                <div class="label">
                    组件尺寸
                    <el-tooltip content="全局设置 Element Plus 组件的默认尺寸大小" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question" />
                    </el-tooltip>
                </div>
                <el-select v-model="elementSize" size="small">
                    <el-option label="默认 (large)" value="large" />
                    <el-option label="中等 (medium)" value="medium" />
                    <el-option label="小 (small)" value="small" />
                    <el-option label="极小 (mini)" value="mini" />
                </el-select>
            </div>
            <div class="setting-item">
                <div class="label">底部版权</div>
                <el-switch v-model="showCopyright" />
            </div>
            <div class="setting-item">
                <div class="label">
                    加载进度条
                    <el-tooltip content="该功能开启时，跳转路由会看到页面顶部有条蓝色的进度条" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableProgress" />
            </div>
            <div class="setting-item">
                <div class="label">
                    动态标题
                    <el-tooltip content="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableDynamicTitle" />
            </div>
            <div class="setting-item">
                <div class="label">
                    欢迎页
                    <el-tooltip content="欢迎页即控制台页面，该功能开启时，登录成功默认进入控制台页面；关闭时则默认进入侧边栏导航第一个导航页面" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableDashboard" />
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: 'ThemeSetting',
    inject: ['reload'],
    props: {},
    data() {
        return {
            isShow: false
        }
    },
    computed: {
        menuMode: {
            get: function() {
                return this.$store.state.settings.menuMode
            },
            set: function(newValue) {
                this.$store.commit('menu/switchHeaderActived', 0)
                this.$store.commit('settings/updateThemeSetting', {
                    'menuMode': newValue
                })
                this.$store.state.settings.menuMode !== 'single' && this.$store.commit('menu/setHeaderActived', this.$route.fullPath)
            }
        },
        elementSize: {
            get: function() {
                return this.$store.state.settings.elementSize
            },
            set: function(newValue) {
                this.$ELEMENT.size = newValue
                this.$store.commit('settings/updateThemeSetting', {
                    'elementSize': newValue
                })
                this.reload()
            }
        },
        enableSidebarCollapse: {
            get: function() {
                return this.$store.state.settings.enableSidebarCollapse
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'enableSidebarCollapse': newValue
                })
            }
        },
        sidebarCollapse: {
            get: function() {
                return this.$store.state.settings.sidebarCollapse
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'sidebarCollapse': newValue
                })
            }
        },
        switchSidebarAndPageJump: {
            get: function() {
                return this.$store.state.settings.switchSidebarAndPageJump
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'switchSidebarAndPageJump': newValue
                })
            }
        },
        sidebarUniqueOpened: {
            get: function() {
                return this.$store.state.settings.sidebarUniqueOpened
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'sidebarUniqueOpened': newValue
                })
            }
        },
        topbarFixed: {
            get: function() {
                return this.$store.state.settings.topbarFixed
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'topbarFixed': newValue
                })
            }
        },
        enableBreadcrumb: {
            get: function() {
                return this.$store.state.settings.enableBreadcrumb
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'enableBreadcrumb': newValue
                })
            }
        },
        showCopyright: {
            get: function() {
                return this.$store.state.settings.showCopyright
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'showCopyright': newValue
                })
            }
        },
        enableNavSearch: {
            get: function() {
                return this.$store.state.settings.enableNavSearch
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'enableNavSearch': newValue
                })
            }
        },
        enableFullscreen: {
            get: function() {
                return this.$store.state.settings.enableFullscreen
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'enableFullscreen': newValue
                })
            }
        },
        enablePageReload: {
            get: function() {
                return this.$store.state.settings.enablePageReload
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'enablePageReload': newValue
                })
            }
        },
        enableProgress: {
            get: function() {
                return this.$store.state.settings.enableProgress
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'enableProgress': newValue
                })
            }
        },
        enableDynamicTitle: {
            get: function() {
                return this.$store.state.settings.enableDynamicTitle
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'enableDynamicTitle': newValue
                })
            }
        },
        enableDashboard: {
            get: function() {
                return this.$store.state.settings.enableDashboard
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'enableDashboard': newValue
                })
            }
        }
    },
    mounted() {
        this.$eventBus.on('global-theme-toggle', () => {
            this.isShow = !this.isShow
        })
    }
}
</script>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
    padding: 0 15px 20px;
    overflow: auto;
}
:deep(.el-input) {
    width: 150px;
}
.menu-mode {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;
    .mode {
        position: relative;
        width: 50px;
        height: 40px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        background-color: #e1e3e6;
        box-shadow: 0 0 15px 1px #aaa;
        transition: 0.3s;
        &:hover {
            box-shadow: 0 0 15px 1px #666;
        }
        &.active {
            box-shadow: 0 0 0 2px #409eff;
        }
        &::before,
        &::after {
            pointer-events: none;
        }
        &-side {
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 10px;
                height: 100%;
                background-color: #222b45;
            }
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 10px;
                width: 15px;
                height: 100%;
                background-color: #fff;
            }
        }
        &-head {
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 10px;
                background-color: #222b45;
            }
            &::after {
                content: '';
                position: absolute;
                top: 10px;
                left: 0;
                width: 15px;
                height: calc(100% - 10px);
                background-color: #fff;
            }
        }
        &-single {
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 15px;
                height: 100%;
                background-color: #fff;
            }
        }
        i {
            position: absolute;
            right: 2px;
            bottom: 2px;
            display: none;
        }
        &.active i {
            display: block;
            color: #409eff;
        }
    }
}
.setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.3s;
    &:hover {
        background: #f1f1f1;
    }
    .label {
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        i {
            margin-left: 4px;
            font-size: 17px;
            color: #e6a23c;
            cursor: help;
        }
    }
}
</style>
