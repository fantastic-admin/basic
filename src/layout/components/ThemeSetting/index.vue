<template>
    <div>
        <el-drawer title="主题配置" :visible.sync="isShow" direction="rtl" :size="$store.state.settings.mode == 'pc' ? '500px' : '300px'">
            <el-alert title="主题配置可实时预览效果，更多设置请在 src/setting.js 中进行设置，建议在生产环境隐藏主题配置功能" type="error" :closable="false" />
            <el-form ref="form" :label-position="$store.state.settings.mode == 'pc' ? 'right' : 'top'" label-width="100px" size="small">
                <el-form-item v-if="$store.state.settings.mode == 'pc'" label="头部">
                    <el-radio-group v-model="showHeader">
                        <el-radio-button :label="true">显示</el-radio-button>
                        <el-radio-button :label="false">隐藏</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="$store.state.settings.mode == 'pc'" label="侧边栏切换">
                    <el-radio-group v-model="enableSidebarCollapse">
                        <el-radio-button :label="true">启用</el-radio-button>
                        <el-radio-button :label="false">关闭</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="侧边栏导航">
                    <el-radio-group v-model="sidebarCollapse">
                        <el-radio-button :label="true">收起</el-radio-button>
                        <el-radio-button :label="false">展开</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="底部版权">
                    <el-radio-group v-model="showCopyright">
                        <el-radio-button :label="true">显示</el-radio-button>
                        <el-radio-button :label="false">隐藏</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="导航搜索">
                    <el-radio-group v-model="enableNavSearch">
                        <el-radio-button :label="true">开启</el-radio-button>
                        <el-radio-button :label="false">关闭</el-radio-button>
                    </el-radio-group>
                    <el-alert title="该功能为页面右上角的搜索按钮，可对侧边栏导航进行快捷搜索" type="info" :closable="false" />
                </el-form-item>
                <el-form-item v-if="$store.state.settings.mode == 'pc'" label="全屏">
                    <el-radio-group v-model="enableFullscreen">
                        <el-radio-button :label="true">开启</el-radio-button>
                        <el-radio-button :label="false">关闭</el-radio-button>
                    </el-radio-group>
                    <el-alert title="该功能为页面右上角的全屏按钮" type="info" :closable="false" />
                    <el-alert title="不建议开启，该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果" type="warning" :closable="false" />
                </el-form-item>
                <el-form-item label="页面刷新">
                    <el-radio-group v-model="enablePageReload">
                        <el-radio-button :label="true">开启</el-radio-button>
                        <el-radio-button :label="false">关闭</el-radio-button>
                    </el-radio-group>
                    <el-alert title="该功能为页面右上角的刷新按钮，开启时会阻止 F5 键原刷新功能，并采用框架提供的刷新模式进行页面刷新" type="info" :closable="false" />
                </el-form-item>
                <el-form-item label="加载进度条">
                    <el-radio-group v-model="enableProgress">
                        <el-radio-button :label="true">开启</el-radio-button>
                        <el-radio-button :label="false">关闭</el-radio-button>
                    </el-radio-group>
                    <el-alert title="该功能开启时，跳转路由会看到页面顶部有条蓝色的进度条" type="info" :closable="false" />
                </el-form-item>
                <el-form-item label="动态标题">
                    <el-radio-group v-model="enableDynamicTitle">
                        <el-radio-button :label="true">开启</el-radio-button>
                        <el-radio-button :label="false">关闭</el-radio-button>
                    </el-radio-group>
                    <el-alert title="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置" type="info" :closable="false" />
                </el-form-item>
                <el-form-item label="控制台">
                    <el-radio-group v-model="enableDashboard">
                        <el-radio-button :label="true">开启</el-radio-button>
                        <el-radio-button :label="false">关闭</el-radio-button>
                    </el-radio-group>
                    <el-alert title="控制台即欢迎页，该功能开启时，登录成功默认进入控制台；关闭时则默认进入侧边栏导航第一个导航页面" type="info" :closable="false" />
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: 'ThemeSetting',
    props: {},
    data() {
        return {
            isShow: false
        }
    },
    computed: {
        showHeader: {
            get: function() {
                return this.$store.state.settings.showHeader
            },
            set: function(newValue) {
                this.$store.commit('settings/updateThemeSetting', {
                    'showHeader': newValue
                })
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
        this.$eventBus.$on('global-theme-toggle', () => {
            this.isShow = !this.isShow
        })
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__wrapper,
::v-deep .el-drawer__wrapper * {
    outline: none !important;
}
::v-deep .el-drawer__body {
    padding: 0 20px 20px;
    overflow: auto;
}
.el-form {
    margin-top: 20px;
    .el-alert {
        margin-top: 10px;
        line-height: initial;
    }
}
</style>
