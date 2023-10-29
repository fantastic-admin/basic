<route lang="yaml">
meta:
  enabled: false
  </route>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const menu = useMenu()

function switchTo() {
  menu.switchTo(menuStore.actived + 1 < menuStore.allMenus.length ? menuStore.actived + 1 : 0)
}
</script>

<template>
  <div>
    <PageHeader title="主导航切换" content="可切换并激活指定的主导航" />
    <PageMain>
      <p>该特性只有在导航模式为 side 和 head 时生效。</p>
      <ElButton :disabled="!['side', 'head'].includes(settingsStore.settings.menu.menuMode)" @click="switchTo">
        切换下一个
      </ElButton>
    </PageMain>
  </div>
</template>
