<script setup lang="ts">
import { createReusableTemplate, useTextDirection } from '@vueuse/core'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './context-menu'

defineOptions({
  name: 'FaContextMenu',
})

defineProps<{
  items: (MenuItem | MenuSubItem)[][]
}>()

const slots = defineSlots<{
  default?: () => VNode
  label?: () => VNode
}>()

const Option = createReusableTemplate<{
  items: (MenuItem | MenuSubItem)[][]
}>()

interface MenuItem {
  label: string
  icon?: string
  variant?: 'default' | 'destructive'
  disabled?: boolean
  handle?: () => void
}

interface MenuSubItem {
  label: string
  items: (MenuItem | MenuSubItem)[][]
}

const dir = useTextDirection({
  observe: true,
})

function hasIcon(group: (MenuItem | MenuSubItem)[][]) {
  return group.some(item => item.some((v) => {
    return 'icon' in v && v.icon
  }))
}

function handleItemClick(item: MenuItem) {
  item.handle?.()
}
</script>

<template>
  <ContextMenu :modal="false" :dir="dir === 'ltr' ? 'ltr' : 'rtl'">
    <ContextMenuTrigger as-child>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent class="z-2050">
      <template v-if="!!slots.label">
        <ContextMenuLabel>
          <slot name="label" />
        </ContextMenuLabel>
        <ContextMenuSeparator />
      </template>
      <Option.define v-slot="{ items: its }">
        <template v-for="(item, index) in its" :key="index">
          <ContextMenuGroup>
            <template v-for="(v, i) in item" :key="i">
              <ContextMenuItem v-if="!('items' in v)" :variant="v.variant" :disabled="v.disabled" class="cursor-pointer" @click="handleItemClick(v)">
                <div v-if="hasIcon(its)" class="flex-center size-4">
                  <FaIcon v-if="v.icon" :name="v.icon" class="size-4" />
                </div>
                {{ v.label }}
              </ContextMenuItem>
              <ContextMenuSub v-else>
                <ContextMenuSubTrigger :inset="hasIcon(its)">
                  {{ v.label }}
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <Option.reuse :items="v.items" />
                </ContextMenuSubContent>
              </ContextMenuSub>
            </template>
          </ContextMenuGroup>
          <ContextMenuSeparator v-if="item.length > 0 && index !== its.length - 1" />
        </template>
      </Option.define>
      <Option.reuse :items="items" />
    </ContextMenuContent>
  </ContextMenu>
</template>
