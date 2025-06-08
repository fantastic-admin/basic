import { pascalCase } from 'scule'

type Slots
  = 'header-start' | 'header-after-logo' | 'header-after-menu' | 'header-end'
    | 'main-sidebar-top' | 'main-sidebar-after-logo' | 'main-sidebar-after-menu' | 'main-sidebar-bottom'
    | 'sub-sidebar-top' | 'sub-sidebar-after-logo' | 'sub-sidebar-after-menu' | 'sub-sidebar-bottom'
    | 'tabbar-start' | 'tabbar-end'
    | 'toolbar-start' | 'toolbar-end'
    | 'free-position'

function tryLoadComponent(name: Slots) {
  const componentMap = import.meta.glob('./*/index.vue', { eager: true })
  const path = `./${pascalCase(name as unknown as string)}/index.vue`
  const component = componentMap[path as keyof typeof componentMap]
  if (!component) {
    return {
      default: defineComponent({
        name: 'SlotsInvalidComponent',
        render: () => null,
      }),
    }
  }
  return component
}

export function useSlots(name: Slots) {
  const component = tryLoadComponent(name)
  return defineComponent((component as any).default)
}
