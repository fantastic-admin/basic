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

function toggleColorScheme(event: MouseEvent) {
  const { startViewTransition } = useViewTransition(() => {
    settingsStore.setColorScheme(settingsStore.settings.app.colorScheme === 'dark' ? 'light' : 'dark')
  })
  startViewTransition()?.ready.then(() => {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: settingsStore.settings.app.colorScheme !== 'dark' ? clipPath : clipPath.reverse(),
      },
      {
        duration: 300,
        easing: 'ease-out',
        pseudoElement: settingsStore.settings.app.colorScheme !== 'dark' ? '::view-transition-new(root)' : '::view-transition-old(root)',
      },
    )
  })
}

const avatarError = ref(false)
watch(() => userStore.avatar, () => {
  if (avatarError.value) {
    avatarError.value = false
  }
})
</script>

<template>
  <div class="tools flex items-center gap-4 px-4 whitespace-nowrap">
    <span v-if="settingsStore.settings.navSearch.enable && settingsStore.mode === 'pc'" class="group inline-flex items-center gap-1 px-2 py-1.5 rounded-2 text-dark dark:text-white bg-stone-1 dark:bg-stone-9 ring-inset ring-stone-3 dark:ring-stone-7 hover:ring-1 cursor-pointer transition" @click="eventBus.emit('global-search-toggle')">
      <SvgIcon name="ri:search-line" />
      <span class="text-sm text-stone-5 group-hover:text-dark dark:group-hover:text-white transition">搜索</span>
      <HKbd v-if="settingsStore.settings.navSearch.enableHotkeys" class="ml-2">{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} S</HKbd>
    </span>
    <div class="flex items-center empty:hidden">
      <span v-if="settingsStore.settings.navSearch.enable && settingsStore.mode === 'mobile'" class="item" @click="eventBus.emit('global-search-toggle')">
        <SvgIcon name="ri:search-line" />
      </span>
      <span v-if="settingsStore.mode === 'pc' && settingsStore.settings.toolbar.enableFullscreen" class="item" @click="toggle">
        <SvgIcon :name="isFullscreen ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-line'" />
      </span>
      <span v-if="settingsStore.settings.toolbar.enablePageReload" class="item" @click="mainPage.reload()">
        <SvgIcon name="iconoir:refresh-double" />
      </span>
      <span v-if="settingsStore.settings.toolbar.enableColorScheme" class="item" @click="toggleColorScheme">
        <SvgIcon :name="settingsStore.settings.app.colorScheme === 'light' ? 'ri:sun-line' : 'ri:moon-line'" />
      </span>
    </div>
    <HDropdownMenu
      :items="[
        [
          { label: settingsStore.settings.home.title, handle: () => router.push({ name: 'home' }), hide: !settingsStore.settings.home.enable },
        ],
        [
          { label: '快捷键介绍', handle: () => eventBus.emit('global-hotkeys-intro-toggle'), hide: settingsStore.mode !== 'pc' },
        ],
        [
          { label: '退出登录', handle: () => userStore.logout() },
        ],
      ]"
    >
      <div flex-center gap-1 cursor-pointer>
        <img v-if="userStore.avatar && !avatarError" :src="userStore.avatar" :onerror="() => (avatarError = true)" class="w-[24px] h-[24px] rounded-full">
        <SvgIcon v-else name="carbon:user-avatar-filled-alt" :size="24" class="text-gray-400" />
        {{ userStore.account }}
        <SvgIcon name="ep:caret-bottom" />
      </div>
    </HDropdownMenu>
  </div>
</template>

<style lang="scss" scoped>
.item {
  --at-apply: flex px-2 py-1 cursor-pointer;
}
</style>
