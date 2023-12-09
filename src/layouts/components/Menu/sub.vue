<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Item from './item.vue'
import type { SubMenuProps } from './types'
import { rootMenuInjectionKey } from './types'

defineOptions({
  name: 'SubMenu',
})

const props = withDefaults(
  defineProps<SubMenuProps>(),
  {
    level: 0,
  },
)

const index = props.menu.path ?? JSON.stringify(props.menu)
const itemRef = shallowRef()
const subMenuRef = shallowRef<OverlayScrollbarsComponentRef>()
const rootMenu = inject(rootMenuInjectionKey)!

const opened = computed(() => {
  return rootMenu.openedMenus.includes(props.uniqueKey.at(-1)!)
})

const transitionEvent = computed(() => {
  return rootMenu.isMenuPopup
    ? {
        enter(el: HTMLElement) {
          if (el.offsetHeight > window.innerHeight) {
            el.style.height = `${window.innerHeight}px`
          }
        },
        afterEnter: () => {},
        beforeLeave: (el: HTMLElement) => {
          el.style.overflow = 'hidden'
          el.style.maxHeight = `${el.offsetHeight}px`
        },
        leave: (el: HTMLElement) => {
          el.style.maxHeight = '0'
        },
        afterLeave(el: HTMLElement) {
          el.style.overflow = ''
          el.style.maxHeight = ''
        },
      }
    : {
        enter(el: HTMLElement) {
          const memorizedHeight = el.offsetHeight
          el.style.maxHeight = '0'
          el.style.overflow = 'hidden'
          void el.offsetHeight
          el.style.maxHeight = `${memorizedHeight}px`
        },
        afterEnter(el: HTMLElement) {
          el.style.overflow = ''
          el.style.maxHeight = ''
        },
        beforeLeave(el: HTMLElement) {
          el.style.overflow = 'hidden'
          el.style.maxHeight = `${el.offsetHeight}px`
        },
        leave(el: HTMLElement) {
          el.style.maxHeight = '0'
        },
        afterLeave(el: HTMLElement) {
          el.style.overflow = ''
          el.style.maxHeight = ''
        },
      }
})

const transitionClass = computed(() => {
  return rootMenu.isMenuPopup
    ? {
        enterActiveClass: 'ease-in-out duration-300',
        enterFromClass: 'opacity-0 translate-x-4',
        enterToClass: 'opacity-100',
        leaveActiveClass: 'ease-in-out duration-300',
        leaveFromClass: 'opacity-100',
        leaveToClass: 'opacity-0',
      }
    : {
        enterActiveClass: 'ease-in-out duration-300',
        enterFromClass: 'opacity-0',
        enterToClass: 'opacity-100',
        leaveActiveClass: 'ease-in-out duration-300',
        leaveFromClass: 'opacity-100',
        leaveToClass: 'opacity-0',
      }
})

const hasChildren = computed(() => {
  let flag = true
  if (props.menu.children) {
    if (props.menu.children.every((item: any) => item.meta?.sidebar === false)) {
      flag = false
    }
  }
  else {
    flag = false
  }
  return flag
})

function handleClick() {
  if (rootMenu.isMenuPopup && hasChildren.value) {
    return
  }
  if (hasChildren.value) {
    rootMenu.handleSubMenuClick(index, props.uniqueKey)
  }
  else {
    rootMenu.handleMenuItemClick(index)
  }
}

let timeout: (() => void) | undefined

function handleMouseenter() {
  if (!rootMenu.isMenuPopup) {
    return
  }
  rootMenu.mouseInMenu = props.uniqueKey
  timeout?.()
  ;({ stop: timeout } = useTimeoutFn(() => {
    if (hasChildren.value) {
      rootMenu.openMenu(index, props.uniqueKey)
      nextTick(() => {
        const el = itemRef.value.ref
        let top = 0
        let left = 0
        if (rootMenu.props.mode === 'vertical' || props.level !== 0) {
          top = el.getBoundingClientRect().top + el.scrollTop
          left = el.getBoundingClientRect().left + el.getBoundingClientRect().width
          if (top + subMenuRef.value!.getElement()!.offsetHeight > window.innerHeight) {
            top = window.innerHeight - subMenuRef.value!.getElement()!.offsetHeight
          }
        }
        else {
          top = el.getBoundingClientRect().top + el.getBoundingClientRect().height
          left = el.getBoundingClientRect().left
          if (top + subMenuRef.value!.getElement()!.offsetHeight > window.innerHeight) {
            subMenuRef.value!.getElement()!.style.height = `${window.innerHeight - top}px`
          }
        }
        subMenuRef.value!.getElement()!.style.top = `${top}px`
        subMenuRef.value!.getElement()!.style.left = `${left}px`
      })
    }
    else {
      const path = props.menu.children ? rootMenu.subMenus[index].indexPath.at(-1)! : rootMenu.items[index].indexPath.at(-1)!
      rootMenu.openMenu(path, rootMenu.subMenus[path].indexPath)
    }
  }, 300))
}

function handleMouseleave() {
  if (!rootMenu.isMenuPopup) {
    return
  }
  rootMenu.mouseInMenu = []
  timeout?.()
  ;({ stop: timeout } = useTimeoutFn(() => {
    if (rootMenu.mouseInMenu.length === 0) {
      rootMenu.closeMenu(props.uniqueKey)
    }
    else {
      if (hasChildren.value) {
        !rootMenu.mouseInMenu.includes(props.uniqueKey.at(-1)!) && rootMenu.closeMenu(props.uniqueKey.at(-1)!)
      }
    }
  }, 300))
}
</script>

<template>
  <Item ref="itemRef" :unique-key="uniqueKey" :item="menu" :level="level" :sub-menu="hasChildren" :expand="opened" @click="handleClick" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave" />
  <Teleport v-if="hasChildren" to="body" :disabled="!rootMenu.isMenuPopup">
    <Transition v-bind="transitionClass" v-on="transitionEvent">
      <OverlayScrollbarsComponent
        v-if="opened" ref="subMenuRef" :options="{ scrollbars: { visibility: 'hidden' } }" defer class="sub-menu" :class="{
          'bg-[var(--g-sub-sidebar-bg)]': rootMenu.isMenuPopup,
          'ring-1 ring-stone-2 dark:ring-stone-8 shadow-xl fixed z-3000 w-[200px]': rootMenu.isMenuPopup,
          'mx-2': rootMenu.isMenuPopup && (rootMenu.props.mode === 'vertical' || level !== 0),
        }"
      >
        <template v-for="item in menu.children" :key="item.path ?? JSON.stringify(item)">
          <SubMenu v-if="item.meta?.sidebar !== false" :unique-key="[...uniqueKey, item.path ?? JSON.stringify(item)]" :menu="item" :level="level + 1" />
        </template>
      </OverlayScrollbarsComponent>
    </Transition>
  </Teleport>
</template>
