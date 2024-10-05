<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import eventBus from '@/utils/eventBus'
import ColorScheme from './ColorScheme/index.vue'
import Fullscreen from './Fullscreen/index.vue'
import NavSearch from './NavSearch/index.vue'
import PageReload from './PageReload/index.vue'

defineOptions({
  name: 'Tools',
})

const router = useRouter()

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const avatarError = ref(false)
watch(() => userStore.avatar, () => {
  if (avatarError.value) {
    avatarError.value = false
  }
})
</script>

<template>
  <div class="flex items-center">
    <NavSearch v-if="settingsStore.settings.toolbar.navSearch" />
    <Fullscreen v-if="settingsStore.settings.toolbar.fullscreen" />
    <PageReload v-if="settingsStore.settings.toolbar.pageReload" />
    <ColorScheme v-if="settingsStore.settings.toolbar.colorScheme" />
    <HDropdownMenu
      :items="[
        [
          { label: settingsStore.settings.home.title, handle: () => router.push({ path: settingsStore.settings.home.fullPath }), hide: !settingsStore.settings.home.enable },
        ],
        [
          { label: '快捷键介绍', handle: () => eventBus.emit('global-hotkeys-intro-toggle'), hide: settingsStore.mode !== 'pc' },
        ],
        [
          { label: '退出登录', handle: () => userStore.logout(settingsStore.settings.home.fullPath) },
        ],
      ]" class="flex-center cursor-pointer px-2"
    >
      <div class="flex-center gap-1">
        <img v-if="userStore.avatar && !avatarError" :src="userStore.avatar" :onerror="() => (avatarError = true)" class="h-[24px] w-[24px] rounded-full">
        <SvgIcon v-else name="i-carbon:user-avatar-filled-alt" :size="24" class="text-gray-400" />
        {{ userStore.account }}
        <SvgIcon name="i-ep:caret-bottom" />
      </div>
    </HDropdownMenu>
  </div>
</template>
