<script setup lang="ts">
import type { DropdownMenuContentProps } from 'reka-ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'

defineOptions({
  name: 'FaDropdown',
})

const props = defineProps<{
  align?: DropdownMenuContentProps['align']
  alignOffset?: DropdownMenuContentProps['alignOffset']
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  collisionPadding?: DropdownMenuContentProps['collisionPadding']
  items: {
    label: string
    icon?: string
    disabled?: boolean
    hide?: boolean
    handle?: () => void
  }[][]
}>()

const slots = defineSlots<{
  default?: () => VNode
  label?: () => VNode
}>()

const myItems = computed(() => {
  return props.items.map((item) => {
    return item.filter(v => !v.hide)
  }).filter(v => v.length)
})

const isItemsHasIcon = computed(() => {
  return myItems.value.some(item => item.some(v => v.icon))
})

function handleItemClick(item: { handle?: () => void }) {
  item.handle?.()
}
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent :align :align-offset :side :side-offset :collision-padding>
      <template v-if="!!slots.label">
        <DropdownMenuLabel>
          <slot name="label" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </template>
      <template v-for="(item, index) in myItems" :key="index">
        <DropdownMenuGroup>
          <DropdownMenuItem v-for="(v, i) in item" :key="i" :disabled="v.disabled" @click="handleItemClick(v)">
            <div v-if="isItemsHasIcon" class="size-4 flex-center">
              <FaIcon v-if="v.icon" :name="v.icon" class="size-4" />
            </div>
            {{ v.label }}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator v-if="index !== myItems.length - 1" />
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
