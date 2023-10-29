<script setup lang="ts">
import type { SubMenuItemProps } from './types'
import { rootMenuInjectionKey } from './types'

const props = withDefaults(
  defineProps<SubMenuItemProps>(),
  {
    level: 0,
    subMenu: false,
    expand: false,
  },
)

const rootMenu = inject(rootMenuInjectionKey)!

const itemRef = ref<HTMLElement>()

const isActived = computed(() => {
  return props.subMenu
    ? rootMenu.subMenus[props.uniqueKey[props.uniqueKey.length - 1]]?.active
    : rootMenu.activeIndex === props.uniqueKey[props.uniqueKey.length - 1]
})

const isItemActive = computed(() => {
  return isActived.value && (!props.subMenu || rootMenu.isMenuPopup)
})

// 缩进样式
const indentStyle = computed(() => {
  return !rootMenu.isMenuPopup
    ? `padding-left: ${20 * (props.level ?? 0)}px`
    : ''
})

defineExpose({
  ref: itemRef,
})
</script>

<template>
  <div
    ref="itemRef" class="menu-item relative transition-all" :class="{
      active: isItemActive,
    }"
  >
    <div
      class="menu-item-container w-full h-full flex justify-between items-center gap-1 px-5 py-4 transition-all cursor-pointer group text-[var(--g-sub-sidebar-menu-color)] hover:(text-[var(--g-sub-sidebar-menu-hover-color)] bg-[var(--g-sub-sidebar-menu-hover-bg)])" :class="{
        'text-[var(--g-sub-sidebar-menu-active-color)]! bg-[var(--g-sub-sidebar-menu-active-bg)]!': isItemActive,
        'px-2!': rootMenu.isMenuPopup && level === 0,
      }" :title="item.meta?.title"
    >
      <div
        class="inline-flex justify-center items-center gap-[12px] flex-1" :class="{
          'flex-col gap-none': rootMenu.isMenuPopup && level === 0,
          'flex-col gap-[2px]!': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName,
          'w-full': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName && rootMenu.props.mode === 'vertical',
          'w-[50px]': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName && rootMenu.props.mode === 'horizontal',
        }" :style="indentStyle"
      >
        <SvgIcon v-if="props.item.meta?.icon" :name="props.item.meta.icon" :size="20" class="menu-item-container-icon transition-transform group-hover:scale-120" async />
        <span
          v-if="!(rootMenu.isMenuPopup && level === 0 && !rootMenu.props.showCollapseName)" class="flex-1 text-sm w-0 truncate transition-width transition-height transition-opacity"
          :class="{
            'opacity-0 w-0 h-0': rootMenu.isMenuPopup && level === 0 && !rootMenu.props.showCollapseName,
            'w-full text-center': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName,
          }"
        >
          {{ item.meta?.title }}
        </span>
      </div>
      <i
        v-if="subMenu && !(rootMenu.isMenuPopup && level === 0)" class="relative w-[10px] ml-1 before:(content-empty absolute w-[6px] h-[1.5px] bg-current -translate-y-[1px] transition-transform-200) after:(content-empty absolute w-[6px] h-[1.5px] bg-current -translate-y-[1px] transition-transform-200)" :class="[
          expand ? 'before:(-rotate-45 -translate-x-[2px]) after:(rotate-45 translate-x-[2px])' : 'before:(rotate-45 -translate-x-[2px]) after:(-rotate-45 translate-x-[2px])',
          rootMenu.isMenuPopup && level === 0 && 'opacity-0',
          rootMenu.isMenuPopup && level !== 0 && '-rotate-90 -top-[1.5px]',
        ]"
      />
    </div>
  </div>
</template>
