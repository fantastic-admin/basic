<script setup name="AppSetting">
const { proxy } = getCurrentInstance()
const route = useRoute()

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useMenuStore } from '@/store/modules/menu'
const menuStore = useMenuStore()

const isShow = ref(false)

import globalSettings from '@/settings'
const settings = ref(globalSettings)

watch(() => settings, () => {
    settingsStore.updateThemeSetting(settings.value)
    menuStore.setActived(0)
    settings.value.menu.menuMode !== 'single' && menuStore.setActived(route.fullPath)
}, {
    deep: true
})

onMounted(() => {
    proxy.$eventBus.on('global-theme-toggle', () => {
        isShow.value = !isShow.value
    })
})

import { useClipboard } from '@vueuse/core'
const { copy, copied, isSupported } = useClipboard()

watch(copied, val => {
    if (val) {
        proxy.$message.success('复制成功，请粘贴到 src/settings.custom.json 文件中！')
    }
})

function handleCopy() {
    copy(JSON.stringify(settings.value, null, 4))
}
</script>

<template>
    <div>
        <el-drawer v-model="isShow" title="应用配置" direction="rtl" :size="350" custom-class="flex-container">
            <div class="container">
                <el-alert title="应用配置可实时预览效果，但仅是临时生效，要想真正作用于项目，可以点击下方的“复制配置”按钮，将配置粘贴到 src/settings.custom.json 中即可，或者也可在 src/settings.js 中直接修改默认配置。同时建议在生产环境隐藏应用配置功能。" type="error" :closable="false" />
                <el-divider v-if="settingsStore.mode === 'pc'">导航栏模式</el-divider>
                <div v-if="settingsStore.mode === 'pc'" class="menu-mode">
                    <el-tooltip content="侧边栏模式（含主导航）" placement="top" :show-after="500" :append-to-body="false">
                        <div class="mode mode-side" :class="{'active': settings.menu.menuMode === 'side'}" @click="settings.menu.menuMode = 'side'">
                            <svg-icon name="el-icon-check" />
                        </div>
                    </el-tooltip>
                    <el-tooltip content="顶部模式" placement="top" :show-after="500" :append-to-body="false">
                        <div class="mode mode-head" :class="{'active': settings.menu.menuMode === 'head'}" @click="settings.menu.menuMode = 'head'">
                            <svg-icon name="el-icon-check" />
                        </div>
                    </el-tooltip>
                    <el-tooltip content="侧边栏模式（不含主导航）" placement="top" :show-after="500" :append-to-body="false">
                        <div class="mode mode-single" :class="{'active': settings.menu.menuMode === 'single'}" @click="settings.menu.menuMode = 'single'">
                            <svg-icon name="el-icon-check" />
                        </div>
                    </el-tooltip>
                </div>
                <el-divider>导航栏</el-divider>
                <div class="setting-item">
                    <div class="label">是否折叠</div>
                    <el-switch v-model="settings.menu.subMenuCollapse" />
                </div>
                <div class="setting-item">
                    <div class="label">
                        切换跳转
                        <el-tooltip content="开启该功能后，切换侧边栏时，页面自动跳转至该侧边栏导航下第一个路由地址" placement="top" :append-to-body="false">
                            <svg-icon name="el-icon-question-filled" />
                        </el-tooltip>
                    </div>
                    <el-switch v-model="settings.menu.switchMainMenuAndPageJump" :disabled="['single'].includes(settings.menu.menuMode)" />
                </div>
                <div class="setting-item">
                    <div class="label">
                        保持展开一个
                        <el-tooltip content="开启该功能后，侧边栏只保持一个子菜单的展开" placement="top" :append-to-body="false">
                            <svg-icon name="el-icon-question-filled" />
                        </el-tooltip>
                    </div>
                    <el-switch v-model="settings.menu.subMenuUniqueOpened" />
                </div>
                <el-divider>顶栏</el-divider>
                <div class="setting-item">
                    <div class="label">是否固定</div>
                    <el-switch v-model="settings.topbar.fixed" />
                </div>
                <div v-if="settingsStore.mode === 'pc'" class="setting-item">
                    <div class="label">折叠按钮</div>
                    <el-switch v-model="settings.topbar.enableSidebarCollapse" />
                </div>
                <div v-if="settingsStore.mode === 'pc'" class="setting-item">
                    <div class="label">面包屑导航</div>
                    <el-switch v-model="settings.topbar.enableBreadcrumb" />
                </div>
                <div class="setting-item">
                    <div class="label">
                        导航栏搜索
                        <el-tooltip content="对导航栏进行快捷搜索" placement="top" :append-to-body="false">
                            <svg-icon name="el-icon-question-filled" />
                        </el-tooltip>
                    </div>
                    <el-switch v-model="settings.topbar.enableNavSearch" />
                </div>
                <div v-if="settingsStore.mode === 'pc'" class="setting-item">
                    <div class="label">
                        全屏
                        <el-tooltip content="该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果" placement="top" :append-to-body="false">
                            <svg-icon name="el-icon-question-filled" />
                        </el-tooltip>
                    </div>
                    <el-switch v-model="settings.topbar.enableFullscreen" />
                </div>
                <div class="setting-item">
                    <div class="label">
                        页面刷新
                        <el-tooltip content="开启时会阻止原生 F5 键刷新功能，并采用框架提供的刷新模式进行页面刷新" placement="top" :append-to-body="false">
                            <svg-icon name="el-icon-question-filled" />
                        </el-tooltip>
                    </div>
                    <el-switch v-model="settings.topbar.enablePageReload" />
                </div>
                <el-divider>底部版权</el-divider>
                <div class="setting-item">
                    <div class="label">是否启用</div>
                    <el-switch v-model="settings.copyright.enable" />
                </div>
                <div class="setting-item">
                    <div class="label">日期</div>
                    <el-input v-model="settings.copyright.dates" size="small" :disabled="!settings.copyright.enable" />
                </div>
                <div class="setting-item">
                    <div class="label">公司</div>
                    <el-input v-model="settings.copyright.company" size="small" :disabled="!settings.copyright.enable" />
                </div>
                <div class="setting-item">
                    <div class="label">网址</div>
                    <el-input v-model="settings.copyright.website" size="small" :disabled="!settings.copyright.enable" />
                </div>
                <el-divider>控制台</el-divider>
                <div class="setting-item">
                    <div class="label">
                        是否开启
                        <el-tooltip content="该功能开启时，登录成功默认进入控制台页面，反之则默认进入导航栏里第一个导航页面" placement="top" :append-to-body="false">
                            <svg-icon name="el-icon-question-filled" />
                        </el-tooltip>
                    </div>
                    <el-switch v-model="settings.dashboard.enable" />
                </div>
                <div class="setting-item">
                    <div class="label">控制台名称</div>
                    <el-input v-model="settings.dashboard.title" size="small" />
                </div>
                <el-divider>其它</el-divider>
                <div class="setting-item">
                    <div class="label">
                        组件尺寸
                        <el-tooltip content="全局设置 Element Plus 组件的默认尺寸大小" placement="top" :append-to-body="false">
                            <svg-icon name="el-icon-question-filled" />
                        </el-tooltip>
                    </div>
                    <el-radio-group v-model="settings.app.elementSize" size="small">
                        <el-radio-button label="large">较大</el-radio-button>
                        <el-radio-button label="default">默认</el-radio-button>
                        <el-radio-button label="small">稍小</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="setting-item">
                    <div class="label">是否启用权限</div>
                    <el-switch v-model="settings.app.enablePermission" />
                </div>
                <div class="setting-item">
                    <div class="label">是否开启后端返回路由数据</div>
                    <el-switch v-model="settings.app.enableBackendReturnRoute" />
                </div>
                <div class="setting-item">
                    <div class="label">
                        载入进度条
                        <el-tooltip content="该功能开启时，跳转路由会看到页面顶部有进度条" placement="top" :append-to-body="false">
                            <svg-icon name="el-icon-question-filled" />
                        </el-tooltip>
                    </div>
                    <el-switch v-model="settings.app.enableProgress" />
                </div>
                <div class="setting-item">
                    <div class="label">
                        动态标题
                        <el-tooltip content="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置" placement="top" :append-to-body="false">
                            <svg-icon name="el-icon-question-filled" />
                        </el-tooltip>
                    </div>
                    <el-switch v-model="settings.app.enableDynamicTitle" />
                </div>
            </div>
            <div v-if="isSupported" class="action-buttons">
                <el-button icon="el-icon-document-copy" type="primary" @click="handleCopy">复制配置</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 0;
}
:deep(.el-drawer__header) {
    margin-bottom: initial;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
}
.flex-container {
    .container {
        padding: 15px;
        overflow: auto;
        flex: 1;
    }
    .action-buttons {
        padding: 15px;
        text-align: center;
        background-color: #fff;
        border-top: 1px solid #ddd;
        .el-button {
            width: 100%;
        }
    }
}
:deep(.el-divider) {
    margin: 36px 0 24px;
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
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 10px;
                height: 100%;
                background-color: #222b45;
            }
            &::after {
                content: "";
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
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 10px;
                background-color: #222b45;
            }
            &::after {
                content: "";
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
                content: "";
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
    .el-switch {
        height: auto;
    }
    .el-input {
        width: 150px;
    }
}
</style>
