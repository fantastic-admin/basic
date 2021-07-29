<template>
    <div class="user">
        <div class="tools">
            <el-tooltip v-if="$store.state.settings.enableNavSearch" effect="dark" content="搜索页面" placement="bottom">
                <span class="item" @click="$eventBus.$emit('global-search-toggle')">
                    <svg-icon name="search" />
                </span>
            </el-tooltip>
            <el-tooltip v-if="$store.state.settings.mode == 'pc' && isFullscreenEnable && $store.state.settings.enableFullscreen" effect="dark" content="全屏" placement="bottom">
                <span class="item" @click="fullscreen">
                    <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
                </span>
            </el-tooltip>
            <el-tooltip v-if="$store.state.settings.enablePageReload" effect="dark" content="刷新页面" placement="bottom">
                <span class="item" @click="reload(2)">
                    <svg-icon name="reload" />
                </span>
            </el-tooltip>
            <el-tooltip v-if="$store.state.settings.enableThemeSetting" effect="dark" content="主题配置" placement="bottom">
                <span class="item" @click="$eventBus.$emit('global-theme-toggle')">
                    <svg-icon name="theme" />
                </span>
            </el-tooltip>
        </div>
        <el-dropdown class="user-container" @command="handleCommand">
            <div class="user-wrapper">
                <el-avatar size="medium">
                    <i class="el-icon-user-solid" />
                </el-avatar>
                {{ $store.state.user.account }}
                <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <el-dropdown-item v-if="$store.state.settings.enableDashboard" command="dashboard">控制台</el-dropdown-item>
                <el-dropdown-item command="setting">个人设置</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
    name: 'UserMenu',
    inject: ['reload'],
    data() {
        return {
            isFullscreenEnable: screenfull.isEnabled,
            isFullscreen: false
        }
    },
    mounted() {
        if (screenfull.isEnabled) {
            screenfull.on('change', this.fullscreenChange)
        }
    },
    beforeDestroy() {
        if (screenfull.isEnabled) {
            screenfull.off('change', this.fullscreenChange)
        }
    },
    methods: {
        fullscreen() {
            screenfull.toggle()
        },
        fullscreenChange() {
            this.isFullscreen = screenfull.isFullscreen
        },
        handleCommand(command) {
            switch (command) {
                case 'dashboard':
                    this.$router.push({
                        name: 'dashboard'
                    })
                    break
                case 'setting':
                    this.$router.push({
                        name: 'personalSetting'
                    })
                    break
                case 'logout':
                    this.$store.dispatch('user/logout').then(() => {
                        this.$router.push({
                            name: 'login'
                        })
                    })
                    break
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
}
.tools {
    margin-right: 20px;
    .item {
        margin-left: 5px;
        padding: 6px 8px;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        transition: all 0.3s;
    }
}
.user-container {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    .user-wrapper {
        .el-avatar {
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 4px;
        }
    }
}
</style>
