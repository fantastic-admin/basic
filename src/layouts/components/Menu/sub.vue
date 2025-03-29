<script setup lang="ts">
import type { SubMenuProps } from './types'
import { cn } from '@/utils'
import { useTimeoutFn } from '@vueuse/core'
import Item from './item.vue'
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
const itemRef = useTemplateRef('itemRef')
const subMenuRef = useTemplateRef('subMenuRef')
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
          el.style.maxHeight = `${el.offsetHeight}px`
          el.style.overflow = 'hidden'
        },
        leave: (el: HTMLElement) => {
          el.style.maxHeight = '0'
        },
        afterLeave(el: HTMLElement) {
          el.style.maxHeight = ''
          el.style.overflow = ''
        },
      }
    : CSS.supports('height', 'calc-size(auto, size)')
      ? {}
      : {
          enter(el: HTMLElement) {
            requestAnimationFrame(() => {
              el.dataset.height = el.offsetHeight.toString()
              el.style.maxHeight = '0'
              void el.offsetHeight
              el.style.maxHeight = `${el.dataset.height}px`
              el.style.overflow = 'hidden'
            })
          },
          afterEnter(el: HTMLElement) {
            el.style.maxHeight = ''
            el.style.overflow = ''
          },
          enterCancelled(el: HTMLElement) {
            el.style.maxHeight = ''
            el.style.overflow = ''
          },
          beforeLeave(el: HTMLElement) {
            el.style.maxHeight = `${el.offsetHeight}px`
            el.style.overflow = 'hidden'
          },
          leave(el: HTMLElement) {
            el.style.maxHeight = '0'
          },
          afterLeave(el: HTMLElement) {
            el.style.maxHeight = ''
            el.style.overflow = ''
          },
          leaveCancelled(el: HTMLElement) {
            el.style.maxHeight = ''
            el.style.overflow = ''
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
        enterFromClass: cn('opacity-0 translate-y-4 scale-95 blur-4', CSS.supports('height', 'calc-size(auto, size)') && 'h-0'),
        enterToClass: 'opacity-100 translate-y-0 scale-100 blur-0',
        leaveActiveClass: 'ease-in-out duration-300',
        leaveFromClass: 'opacity-100 translate-y-0 scale-100 blur-0',
        leaveToClass: cn('opacity-0 translate-y-4 scale-95 blur-4', CSS.supports('height', 'calc-size(auto, size)') && 'h-0'),
      }
})

const hasChildren = computed(() => {
  return props.menu.children?.some((item: any) => item.meta?.menu !== false) ?? false
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
        const el = itemRef.value?.ref
        const subMenuEl = subMenuRef.value?.$el
        if (!el || !subMenuEl) {
          return
        }
        let top = 0
        let left = 0
        if (rootMenu.props.mode === 'vertical' || props.level !== 0) {
          top = el.getBoundingClientRect().top + el.scrollTop
          left = el.getBoundingClientRect().left + el.getBoundingClientRect().width
          if (top + subMenuEl.offsetHeight > window.innerHeight) {
            top = Math.max(0, window.innerHeight - subMenuEl.offsetHeight)
          }
        }
        else {
          top = el.getBoundingClientRect().top + el.getBoundingClientRect().height
          left = el.getBoundingClientRect().left
          if (top + subMenuEl.offsetHeight > window.innerHeight) {
            subMenuEl.style.height = `${window.innerHeight - top}px`
          }
        }
        if (left + subMenuEl.offsetWidth > document.documentElement.clientWidth) {
          left = el.getBoundingClientRect().left - el.getBoundingClientRect().width
        }
        subMenuEl.style.top = `${top}px`
        subMenuEl.style.insetInlineStart = `${left}px`
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
      <FaScrollArea
        v-if="opened" ref="subMenuRef" :scrollbar="false" :mask="rootMenu.isMenuPopup" :class="cn('sub-menu static h-[calc-size(auto,size)] rounded-lg', {
          'bg-[var(--g-sub-sidebar-bg)]': rootMenu.isMenuPopup,
          'border shadow-xl fixed z-3000 w-[200px]': rootMenu.isMenuPopup,
          'mx-1': rootMenu.isMenuPopup && (rootMenu.props.mode === 'vertical' || level !== 0),
          'py-1': rootMenu.isMenuPopup,
        })"
      >
        <template v-for="item in menu.children" :key="item.path ?? JSON.stringify(item)">
          <SubMenu v-if="item.meta?.menu !== false" :unique-key="[...uniqueKey, item.path ?? JSON.stringify(item)]" :menu="item" :level="level + 1" />
        </template>
      </FaScrollArea>
    </Transition>
  </Teleport>
</template>
