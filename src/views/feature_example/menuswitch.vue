<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const menu = useMenu()

function switchToPrev() {
  menu.switchTo(menuStore.actived - 1 >= 0 ? menuStore.actived - 1 : menuStore.allMenus.length - 1)
}

function switchToNext() {
  menu.switchTo(menuStore.actived + 1 < menuStore.allMenus.length ? menuStore.actived + 1 : 0)
}
</script>

<template>
  <div>
    <FaPageHeader title="主导航切换" description="可切换并激活指定的主导航" />
    <FaPageMain>
      <p>该特性只有在导航模式为 side 和 head 时生效。</p>
      <ElButton :disabled="!['side', 'head'].includes(settingsStore.settings.menu.mode)" @click="switchToPrev">
        切换上一个
      </ElButton>
      <ElButton :disabled="!['side', 'head'].includes(settingsStore.settings.menu.mode)" @click="switchToNext">
        切换下一个
      </ElButton>
    </FaPageMain>
  </div>
</template>
