import type { HotkeyHandler, HotkeyHandlersMap, HotkeyId } from './types'
import hotkeys from 'hotkeys-js'
import { hotkeyBindings, hotkeyIds } from './registry'

export function useHotkey(id: HotkeyId, handler: HotkeyHandler, active: MaybeRefOrGetter<boolean> = true) {
  const binding = hotkeyBindings.find(item => item.id === id)
  const appSettingsStore = useAppSettingsStore()
  const hotkeyContext = {
    settings: appSettingsStore.settings,
  }
  let currentHandler: ((event: KeyboardEvent, hotkeyHandler: { key: string }) => void) | undefined

  function bind() {
    if (currentHandler || !binding) {
      return
    }
    const currentBinding = binding

    currentHandler = (event, hotkeyHandler) => {
      if (currentBinding.enabled && !currentBinding.enabled(hotkeyContext)) {
        return
      }

      if (currentBinding.preventDefault !== false) {
        event.preventDefault()
      }

      handler({
        event,
        hotkey: hotkeyHandler.key,
      })
    }

    hotkeys(currentBinding.keys.join(','), currentHandler)
  }

  function unbind() {
    if (!currentHandler || !binding) {
      return
    }

    hotkeys.unbind(binding.keys.join(','), currentHandler)
    currentHandler = undefined
  }

  watch(() => toValue(active), (val) => {
    if (val) {
      bind()
    }
    else {
      unbind()
    }
  }, {
    immediate: true,
  })

  onUnmounted(() => {
    unbind()
  })
}

export function useHotkeyBindings(handlers: HotkeyHandlersMap, active: MaybeRefOrGetter<boolean> = true) {
  hotkeyIds.forEach((id) => {
    const handler = handlers[id]
    if (handler) {
      useHotkey(id, handler, active)
    }
  })
}
