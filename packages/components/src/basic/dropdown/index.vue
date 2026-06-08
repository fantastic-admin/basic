<script setup lang="ts">
import type { DropdownMenuContentProps } from 'reka-ui'
import type { VNode } from 'vue'
import { createReusableTemplate, useTextDirection } from '@vueuse/core'
import Icon from '../icon/index.vue'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu'

defineOptions({
  name: 'BuiltInDropdown',
})

defineProps<{
  align?: DropdownMenuContentProps['align']
  alignOffset?: DropdownMenuContentProps['alignOffset']
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  collisionPadding?: DropdownMenuContentProps['collisionPadding']
  items: (MenuItem | MenuSubItem)[][]
}>()

const slots = defineSlots<{
  default?: () => VNode
  header?: () => VNode
  footer?: () => VNode
}>()

const Option = createReusableTemplate<{
  items: (MenuItem | MenuSubItem)[][]
}>()

interface MenuItem {
  label: string
  type?: 'checkbox'
  icon?: string
  variant?: 'default' | 'destructive'
  disabled?: boolean
  checked?: boolean
  handle?: (checked?: boolean) => void
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

function handleItemClick(item: { handle?: (checked?: boolean) => void }) {
  item.handle?.()
}

function handleCheckboxItemChange(item: MenuItem, checked: boolean) {
  item.handle?.(checked)
}
</script>

<template>
  <DropdownMenu :modal="false" :dir="dir === 'ltr' ? 'ltr' : 'rtl'">
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent :align :align-offset :side :side-offset :collision-padding class="z-2000">
      <template v-if="!!slots.header">
        <DropdownMenuLabel>
          <slot name="header" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </template>
      <Option.define v-slot="{ items: its }">
        <template v-for="(item, index) in its" :key="index">
          <DropdownMenuGroup>
            <template v-for="(v, i) in item" :key="i">
              <DropdownMenuCheckboxItem
                v-if="!('items' in v) && v.type === 'checkbox'"
                :model-value="v.checked"
                :disabled="v.disabled"
                @update:model-value="value => handleCheckboxItemChange(v, value)"
              >
                {{ v.label }}
              </DropdownMenuCheckboxItem>
              <DropdownMenuItem v-else-if="!('items' in v)" :variant="v.variant" :disabled="v.disabled" @click="handleItemClick(v)">
                <div v-if="hasIcon(its)" class="flex-center size-4">
                  <Icon v-if="v.icon" :name="v.icon" class="size-4" />
                </div>
                {{ v.label }}
              </DropdownMenuItem>
              <DropdownMenuSub v-else>
                <DropdownMenuSubTrigger :inset="hasIcon(its)">
                  {{ v.label }}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <Option.reuse :items="v.items" />
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </template>
          </DropdownMenuGroup>
          <DropdownMenuSeparator v-if="item.length > 0 && index !== its.length - 1" />
        </template>
      </Option.define>
      <Option.reuse :items="items" />
      <template v-if="!!slots.footer">
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <slot name="footer" />
        </DropdownMenuLabel>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
