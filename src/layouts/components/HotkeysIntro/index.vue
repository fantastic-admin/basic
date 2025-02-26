<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'HotkeysIntro',
})

const isShow = ref(false)

const settingsStore = useSettingsStore()

onMounted(() => {
  eventBus.on('global-hotkeys-intro-toggle', () => {
    isShow.value = !isShow.value
  })
})
</script>

<template>
  <FaModal v-model="isShow" title="快捷键介绍" :footer="false">
    <div class="px-4">
      <div class="grid gap-4 sm-grid-cols-2">
        <div>
          <h2 class="m-0 text-lg font-bold">
            全局
          </h2>
          <ul class="list-none ps-2 pt-2 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <div class="flex-shrink-0 space-x-1">
                <FaKbd>{{ settingsStore.os === 'mac' ? '⌘' : 'Ctrl' }}</FaKbd>
                <FaKbd>I</FaKbd>
              </div>
              查看系统信息
            </li>
            <li v-if="settingsStore.settings.toolbar.navSearch && settingsStore.settings.navSearch.enableHotkeys" class="flex-baseline gap-2 py-1">
              <div class="flex-shrink-0 space-x-1">
                <FaKbd>{{ settingsStore.os === 'mac' ? '⌘' : 'Ctrl' }}</FaKbd>
                <FaKbd>K</FaKbd>
              </div>
              唤起导航搜索
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.menu.enableHotkeys && ['side', 'head'].includes(settingsStore.settings.menu.mode)">
          <h2 class="m-0 text-lg font-bold">
            主导航
          </h2>
          <ul class="list-none ps-2 pt-2 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <div class="flex-shrink-0 space-x-1">
                <FaKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</FaKbd>
                <FaKbd>`</FaKbd>
              </div>
              激活下一个主导航
            </li>
            <li class="flex-baseline gap-2 py-1">
              <div class="flex-shrink-0 space-x-1">
                <FaKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</FaKbd>
                <FaKbd>{{ settingsStore.os === 'mac' ? '⇧' : 'Shift' }}</FaKbd>
                <FaKbd>`</FaKbd>
              </div>
              激活上一个主导航
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.enableHotkeys">
          <h2 class="m-0 text-lg font-bold">
            标签栏
          </h2>
          <ul class="list-none ps-2 pt-2 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <div class="flex-shrink-0 space-x-1">
                <FaKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</FaKbd>
                <FaKbd>←</FaKbd>
              </div>
              切换到上一个标签页
            </li>
            <li class="flex-baseline gap-2 py-1">
              <div class="flex-shrink-0 space-x-1">
                <FaKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</FaKbd>
                <FaKbd>→</FaKbd>
              </div>
              切换到下一个标签页
            </li>
            <li class="flex-baseline gap-2 py-1">
              <div class="flex-shrink-0 space-x-1">
                <FaKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</FaKbd>
                <FaKbd>W</FaKbd>
              </div>
              关闭当前标签页
            </li>
            <li class="flex-baseline gap-2 py-1">
              <div class="flex-shrink-0 space-x-1">
                <FaKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</FaKbd>
                <FaKbd>1~9</FaKbd>
              </div>
              切换到第 n 个标签页
            </li>
            <li class="flex-baseline gap-2 py-1">
              <div class="flex-shrink-0 space-x-1">
                <FaKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</FaKbd>
                <FaKbd>0</FaKbd>
              </div>
              切换到最后一个标签页
            </li>
          </ul>
        </div>
      </div>
    </div>
  </FaModal>
</template>
