<script setup lang="ts">
const appSettingsStore = useAppSettingsStore()
const appMenuStore = useAppMenuStore()

const appMenu = useAppMenu()

function switchToPrev() {
  appMenu.switchTo(appMenuStore.actived - 1 >= 0 ? appMenuStore.actived - 1 : appMenuStore.allMenus.length - 1)
}

function switchToNext() {
  appMenu.switchTo(appMenuStore.actived + 1 < appMenuStore.allMenus.length ? appMenuStore.actived + 1 : 0)
}
</script>

<template>
  <div>
    <FaPageHeader title="导航切换" description="可切换并激活指定的导航" />
    <FaPageMain main-class="space-y-2">
      <p v-show="!['side', 'head'].includes(appSettingsStore.settings.menu.mode)">
        该特性只有在导航模式为 side 和 head 时生效。
      </p>
      <FaButtonGroup>
        <FaButton variant="outline" :disabled="!['side', 'head'].includes(appSettingsStore.settings.menu.mode)" @click="switchToPrev">
          <FaIcon name="i-mdi:arrow-left" />
        </FaButton>
        <FaButton variant="outline" :disabled="!['side', 'head'].includes(appSettingsStore.settings.menu.mode)" @click="switchToNext">
          <FaIcon name="i-mdi:arrow-right" />
        </FaButton>
      </FaButtonGroup>
    </FaPageMain>
  </div>
</template>
