<script setup lang="ts">
import { hotkeyBindings } from '@/hotkeys'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'HotkeysIntro',
})

const appSettingsStore = useAppSettingsStore()
const hotkeyContext = {
  settings: appSettingsStore.settings,
}

const helpGroupMeta = {
  global: { title: '全局', order: 10 },
  nav: { title: '主导航', order: 20 },
  tabbar: { title: '标签栏', order: 30 },
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
  const groups = new Map<string, {
    id: string
    title: string
    order: number
    items: {
      id: string
      title: string
      order: number
      displayKeys: string[]
    }[]
  }>()

  hotkeyBindings.forEach((binding) => {
    const help = binding.help
    if (!help) {
      return
    }
    if (help.visible && !help.visible(hotkeyContext)) {
      return
    }

    const meta = helpGroupMeta[help.group as keyof typeof helpGroupMeta]
    const group = groups.get(help.group) ?? {
      id: help.group,
      title: help.groupTitleKey ? itemTitleMap[help.groupTitleKey] ?? help.groupTitleKey : meta?.title ?? help.group,
      order: meta?.order ?? 100,
      items: [],
    }

    group.items.push({
      id: binding.id,
      title: itemTitleMap[help.titleKey] ?? help.titleKey,
      order: help.order ?? 0,
      displayKeys: appSettingsStore.os === 'mac' && help.displayKeys.mac
        ? help.displayKeys.mac
        : help.displayKeys.default,
    })
    groups.set(help.group, group)
  })

  return Array.from(groups.values())
    .map(group => ({
      ...group,
      items: [...group.items].sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => a.order - b.order)
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
