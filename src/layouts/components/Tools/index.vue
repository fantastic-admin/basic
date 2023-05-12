<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import eventBus from '@/utils/eventBus'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

defineOptions({
  name: 'Tools',
})

const router = useRouter()

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const mainPage = useMainPage()
const { isFullscreen, toggle } = useFullscreen()

function userCommand(command: 'home' | 'setting' | 'hotkeys' | 'logout') {
  switch (command) {
    case 'home':
      router.push({
        name: 'home',
      })
      break
    case 'setting':
      router.push({
        name: 'personalSetting',
      })
      break
    case 'hotkeys':
      eventBus.emit('global-hotkeys-intro-toggle')
      break
    case 'logout':
      userStore.logout()
      break
  }
}
function pro() {
  window.open('https://hooray.gitee.io/fantastic-admin-pro-example/', '_blank')
}
</script>

<template>
  <div class="tools">
    <div class="buttons">
      <span v-if="settingsStore.mode === 'pc'" class="item item-pro" @click="pro">
        <el-icon>
          <svg-icon name="pro" />
        </el-icon>
        <span class="title">查看专业版</span>
      </span>
      <span v-if="settingsStore.settings.navSearch.enable" class="item" @click="eventBus.emit('global-search-toggle')">
        <el-icon>
          <svg-icon name="ep:search" />
        </el-icon>
      </span>
      <span v-if="settingsStore.mode === 'pc' && settingsStore.settings.toolbar.enableFullscreen" class="item" @click="toggle">
        <el-icon>
          <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
        </el-icon>
      </span>
      <span v-if="settingsStore.settings.toolbar.enablePageReload" class="item" @click="mainPage.reload()">
        <el-icon>
          <svg-icon name="ep:refresh-right" />
        </el-icon>
      </span>
      <span v-if="settingsStore.settings.toolbar.enableColorScheme" class="item" @click="settingsStore.setColorScheme(settingsStore.settings.app.colorScheme === 'dark' ? 'light' : 'dark')">
        <el-icon>
          <svg-icon v-show="settingsStore.settings.app.colorScheme === 'light'" name="ep:sunny" />
          <svg-icon v-show="settingsStore.settings.app.colorScheme === 'dark'" name="ep:moon" />
        </el-icon>
      </span>
    </div>
    <el-dropdown class="user-container" size="default" @command="userCommand">
      <div class="user-wrapper">
        <el-avatar size="small">
          <el-icon>
            <svg-icon name="ep:user-filled" />
          </el-icon>
        </el-avatar>
        {{ userStore.account }}
        <el-icon>
          <svg-icon name="ep:caret-bottom" />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-dropdown">
          <el-dropdown-item v-if="settingsStore.settings.home.enable" command="home">
            {{ settingsStore.settings.home.title }}
          </el-dropdown-item>
          <el-dropdown-item command="setting">
            个人设置
          </el-dropdown-item>
          <el-dropdown-item v-if="settingsStore.mode === 'pc'" divided command="hotkeys">
            快捷键介绍
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.tools {
  display: flex;
  align-items: center;
  padding: 0 20px;
  white-space: nowrap;

  .buttons {
    margin-right: 20px;

    .item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      width: 34px;
      cursor: pointer;
      vertical-align: middle;

      .el-icon {
        color: var(--el-text-color-primary);
        transition: var(--el-transition-color);
      }
    }

    .item-pro {
      display: inline-flex;
      align-items: center;
      width: auto;
      padding: 0 10px;
      transform-origin: right center;
      animation: pro-text 3s ease-out infinite;

      @keyframes pro-text {
        0%,
        20% {
          transform: scale(1);
        }

        50%,
        70% {
          transform: scale(1.2);
        }

        100% {
          transform: scale(1);
        }
      }

      .title {
        padding-left: 5px;
        font-weight: bold;
        font-size: 14px;
        background-image: linear-gradient(to right, #ffa237, #fc455d);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}

:deep(.user-container) {
  display: inline-block;
  height: 24px;
  line-height: 24px;
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
