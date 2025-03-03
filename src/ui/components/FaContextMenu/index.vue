<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './context-menu'

defineOptions({
  name: 'FaContextMenu',
})

const props = defineProps<{
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
  <ContextMenu :modal="false">
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
      <template v-for="(item, index) in myItems" :key="index">
        <ContextMenuGroup>
          <ContextMenuItem v-for="(v, i) in item" :key="i" :disabled="v.disabled" class="cursor-pointer" @click="handleItemClick(v)">
            <div v-if="isItemsHasIcon" class="size-4 flex-center">
              <FaIcon v-if="v.icon" :name="v.icon" class="size-4" />
            </div>
            {{ v.label }}
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator v-if="index !== myItems.length - 1" />
      </template>
    </ContextMenuContent>
  </ContextMenu>
</template>
