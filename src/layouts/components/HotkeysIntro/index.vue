<script setup lang="ts">
import eventBus from '@/utils/eventBus'
import useSettingsStore from '@/store/modules/settings'

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
      <div class="grid md:grid-cols-2 gap-2">
        <div>
          <h2 class="text-lg font-bold m-0">
            全局
          </h2>
          <ul class="list-none pl-4 text-sm">
            <li class="py-1">
              <HKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</HKbd>
              <HKbd>I</HKbd>
              查看系统信息
            </li>
            <li v-if="settingsStore.settings.navSearch.enable && settingsStore.settings.navSearch.enableHotkeys" class="py-1">
              <HKbd>{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}</HKbd>
              <HKbd>S</HKbd>
              唤起导航搜索
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.menu.enableHotkeys && ['side', 'head'].includes(settingsStore.settings.menu.menuMode)">
          <h2 class="text-lg font-bold m-0">
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
      </div>
    </div>
  </HDialog>
</template>
