<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import eventBus from '@/utils/eventBus'
import Profile from './profile.vue'

const props = withDefaults(defineProps<{
  onlyAvatar?: boolean
  dropdownAlign?: 'start' | 'center' | 'end'
  dropdownSide?: 'left' | 'right' | 'top' | 'bottom'
  buttonVariant?: 'secondary' | 'ghost'
  class?: HTMLAttributes['class']
}>(), {
  dropdownAlign: 'end',
  dropdownSide: 'right',
  buttonVariant: 'ghost',
})

const router = useRouter()

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const isProfileShow = ref(false)
</script>

<template>
  <FaDropdown
    :align="dropdownAlign" :side="dropdownSide" :items="[
      [
        { label: settingsStore.settings.home.title, icon: 'i-mdi:home', handle: () => router.push({ path: settingsStore.settings.home.fullPath }), hide: !settingsStore.settings.home.enable },
        { label: '个人设置', icon: 'i-mdi:account', handle: () => isProfileShow = true },
      ],
      [
        { label: '快捷键介绍', icon: 'i-mdi:keyboard', handle: () => eventBus.emit('global-hotkeys-intro-toggle'), hide: settingsStore.mode !== 'pc' },
      ],
      [
        { label: '退出登录', icon: 'i-mdi:logout', handle: () => userStore.logout(settingsStore.settings.home.fullPath) },
      ],
    ]" class="flex-center"
  >
    <template #header>
      <div class="space-y-2">
        <div class="text-xs text-secondary-foreground/50 font-light">
          当前登录账号
        </div>
        <div class="flex-center-start gap-2">
          <FaAvatar :src="userStore.avatar" :fallback="userStore.account.slice(0, 5)" shape="square" />
          <div class="space-y-1">
            <div class="text-base lh-none">
              {{ userStore.account }}
            </div>
            <div class="text-xs text-secondary-foreground/50 font-normal">
              [ 这里可以显示邮箱 ]
            </div>
          </div>
        </div>
      </div>
    </template>
    <FaButton
      :variant="buttonVariant" :class="cn('flex-center gap-1 p-2', {
        'size-8 p-1': onlyAvatar,
      }, props.class)"
    >
      <FaAvatar :src="userStore.avatar" :class="cn('size-6', { 'size-full': onlyAvatar })">
        <FaIcon name="i-carbon:user-avatar-filled" class="size-6 text-secondary-foreground/50" />
      </FaAvatar>
      <div v-if="!onlyAvatar" class="min-w-0 flex-center-between flex-1 gap-2">
        <div class="flex-1 truncate text-start">
          {{ userStore.account }}
        </div>
        <FaIcon name="i-material-symbols:expand-all-rounded" />
      </div>
    </FaButton>
  </FaDropdown>
  <FaModal v-model="isProfileShow" align-center :header="false" :footer="false" :close-on-click-overlay="false" :close-on-press-escape="false" class="h-500px max-w-xl overflow-hidden" content-class="min-h-full p-0 flex">
    <Profile />
  </FaModal>
</template>
