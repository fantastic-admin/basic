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
  <HDialog v-model="isShow" title="快捷键介绍">
    <div class="px-4">
      <div class="grid gap-2 sm-grid-cols-2">
        <div>
          <h2 class="m-0 text-lg font-bold">
            全局
          </h2>
          <ul class="list-none pl-4 text-sm">
            <li class="py-1">
              <HKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</HKbd>
              <HKbd>I</HKbd>
              查看系统信息
            </li>
            <li v-if="settingsStore.settings.toolbar.navSearch && settingsStore.settings.navSearch.enableHotkeys" class="py-1">
              <HKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</HKbd>
              <HKbd>S</HKbd>
              唤起导航搜索
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.menu.enableHotkeys && ['side', 'head'].includes(settingsStore.settings.menu.mode)">
          <h2 class="m-0 text-lg font-bold">
            主导航
          </h2>
          <ul class="list-none pl-4 text-sm">
            <li class="py-1">
              <HKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</HKbd>
              <HKbd>`</HKbd>
              激活下一个主导航
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.enableHotkeys">
          <h2 class="m-0 text-lg font-bold">
            标签栏
          </h2>
          <ul class="list-none pl-4 text-sm">
            <li class="py-1">
              <HKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</HKbd>
              <HKbd>←</HKbd>
              切换到上一个标签页
            </li>
            <li class="py-1">
              <HKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</HKbd>
              <HKbd>→</HKbd>
              切换到下一个标签页
            </li>
            <li class="py-1">
              <HKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</HKbd>
              <HKbd>W</HKbd>
              关闭当前标签页
            </li>
            <li class="py-1">
              <HKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</HKbd>
              <HKbd>1~9</HKbd>
              切换到第 n 个标签页
            </li>
            <li class="py-1">
              <HKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</HKbd>
              <HKbd>0</HKbd>
              切换到最后一个标签页
            </li>
          </ul>
        </div>
      </div>
    </div>
  </HDialog>
</template>
