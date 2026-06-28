<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import eventBus from '@/utils/eventBus'
import Profile from './profile.vue'

defineOptions({
  name: 'AppAccountButton',
})

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

const appSettingsStore = useAppSettingsStore()
const appAccountStore = useAppAccountStore()

const { generateTitle } = useAppMenu()

const profileModal = useFaModal().create({
  alignCenter: true,
  header: false,
  footer: false,
  closeOnClickOverlay: false,
  closeOnPressEscape: false,
  class: 'h-[500px] sm:max-w-xl overflow-hidden',
  contentClass: 'min-h-full p-0 flex',
  content: () => h(Profile),
})
</script>

<template>
  <FaDropdown
    :align="dropdownAlign" :side="dropdownSide" :items="[
      [
        ...(appSettingsStore.settings.app.home.enable
          ? [{ label: generateTitle(appSettingsStore.settings.app.home.title), icon: 'i-mdi:home', handle: () => router.push({ path: appSettingsStore.settings.app.home.fullPath }) }]
          : []),
        { label: '个人设置', icon: 'i-mdi:account', handle: () => profileModal.open() },
      ],
      [
        ...(appSettingsStore.mode === 'pc'
          ? [{ label: '快捷键', icon: 'i-mdi:keyboard', handle: () => eventBus.emit('global-hotkeys-intro-toggle') }]
          : []),
      ],
      [
        {
          label: '退出登录',
          icon: 'i-mdi:logout',
          handle: () => appAccountStore.logout(appSettingsStore.settings.app.home.fullPath),
        },
      ],
    ]" class="flex-center"
  >
    <template #header>
      <div class="flex-center-start gap-2">
        <FaAvatar :src="appAccountStore.avatar" :fallback="appAccountStore.account.slice(0, 2)" shape="square" />
        <div class="min-w-0 space-y-1">
          <div class="text-base lh-none truncate">
            {{ appAccountStore.account }}
          </div>
          <div class="text-xs text-secondary-foreground/50 font-normal">
            [ xyz@xyz.com ]
          </div>
        </div>
      </div>
    </template>
    <FaButton
      :variant="buttonVariant" size="icon-sm" :class="cn('flex-center gap-1 p-2', {
        'p-1': onlyAvatar,
      }, props.class)"
    >
      <FaAvatar :src="appAccountStore.avatar" :class="cn('size-6', { 'size-full': onlyAvatar })">
        <FaIcon name="i-carbon:user-avatar-filled" class="text-secondary-foreground/50 size-6" />
      </FaAvatar>
      <div v-if="!onlyAvatar" class="flex-center-between flex-1 gap-2 min-w-0">
        <div class="text-start flex-1 truncate">
          {{ appAccountStore.account }}
        </div>
        <FaIcon name="i-material-symbols:expand-all-rounded" />
      </div>
    </FaButton>
  </FaDropdown>
</template>
