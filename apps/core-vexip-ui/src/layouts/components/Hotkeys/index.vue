<script setup lang="ts">
import { globalHotkeyBindings } from '@/hotkeys/registry'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'HotkeysIntro',
})

const appSettingsStore = useAppSettingsStore()
const hotkeyContext = {
  settings: appSettingsStore.settings,
}

const groupTitleMap = {
  global: '全局',
  nav: '主导航',
  tabbar: '标签栏',
} as const

const itemTitleMap: Record<string, string> = {
  'global.system': '查看系统信息',
  'global.search': '唤起导航搜索',
  'nav.next': '激活下一个主导航',
  'nav.prev': '激活上一个主导航',
  'tabbar.prev': '切换到上一个标签页',
  'tabbar.next': '切换到下一个标签页',
  'tabbar.close': '关闭当前标签页',
  'tabbar.n': '切换到第 n 个标签页',
  'tabbar.last': '切换到最后一个标签页',
} as const

const isShow = ref(false)

const helpGroups = computed(() => {
  const groups = [
    { id: 'global', title: groupTitleMap.global },
    { id: 'nav', title: groupTitleMap.nav },
    { id: 'tabbar', title: groupTitleMap.tabbar },
  ] as const

  return groups.map((group) => {
    const items = globalHotkeyBindings
      .filter(binding => binding.help?.group === group.id)
      .filter((binding) => {
        if (!binding.help) {
          return false
        }
        if (binding.help.visible) {
          return binding.help.visible(hotkeyContext)
        }
        return true
      })
      .sort((a, b) => (a.help?.order ?? 0) - (b.help?.order ?? 0))
      .map((binding) => {
        const displayKeys = appSettingsStore.os === 'mac' && binding.help?.displayKeys.mac
          ? binding.help.displayKeys.mac
          : binding.help?.displayKeys.default ?? []

        return {
          id: binding.id,
          title: binding.help?.titleKey ? itemTitleMap[binding.help.titleKey] : '',
          displayKeys,
        }
      })

    return {
      ...group,
      items,
    }
  }).filter(group => group.items.length > 0)
})

onMounted(() => {
  eventBus.on('global-hotkeys-intro-toggle', () => {
    isShow.value = !isShow.value
  })
})

onUnmounted(() => {
  eventBus.off('global-hotkeys-intro-toggle')
})
</script>

<template>
  <FaModal v-model="isShow" title="快捷键" :footer="false">
    <div class="px-4">
      <div class="gap-4 grid sm-grid-cols-2">
        <div v-for="group in helpGroups" :key="group.id">
          <h2 class="text-lg font-bold m-0">
            {{ group.title }}
          </h2>
          <ul class="text-sm ps-2 pt-2 list-none">
            <li v-for="item in group.items" :key="item.id" class="py-1 flex-baseline gap-2">
              <FaKbdGroup>
                <FaKbd v-for="key in item.displayKeys" :key="key">
                  {{ key }}
                </FaKbd>
              </FaKbdGroup>
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </FaModal>
</template>
