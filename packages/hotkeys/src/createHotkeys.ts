import type { MaybeRefOrGetter } from 'vue'
import type { BuiltinHotkeyId } from './registry'
import type {
  HotkeyBinding,
  HotkeyContextBase,
  HotkeyHandler,
  HotkeyHandlersMap,
  HotkeyIdMap,
  HotkeyIdValue,
} from './types'
import hotkeys from 'hotkeys-js'
import { onUnmounted, toValue, watch } from 'vue'
import {
  BUILTIN_HOTKEY_ID,
  builtinGlobalHotkeyBindings,
  builtinMenuSearchHotkeyBindings,
} from './registry'

type EmptyHotkeyIdMap = Record<never, never>

export type HotkeyId<TExtId extends HotkeyIdMap = EmptyHotkeyIdMap> = BuiltinHotkeyId | HotkeyIdValue<TExtId>

export interface CreateHotkeysOptions<
  TExtId extends HotkeyIdMap = EmptyHotkeyIdMap,
  TContext extends HotkeyContextBase = HotkeyContextBase,
> {
  extendIds?: TExtId
  extendGlobalHotkeyBindings?: readonly HotkeyBinding<HotkeyId<TExtId>, TContext>[]
  extendScopedHotkeyBindings?: readonly HotkeyBinding<HotkeyId<TExtId>, TContext>[]
  getContext: () => TContext
}

export function createHotkeys<
  const TExtId extends HotkeyIdMap = EmptyHotkeyIdMap,
  TContext extends HotkeyContextBase = HotkeyContextBase,
>(options: CreateHotkeysOptions<TExtId, TContext>) {
  type Id = HotkeyId<TExtId>

  const HOTKEY_ID = {
    ...BUILTIN_HOTKEY_ID,
    ...options.extendIds,
  } as typeof BUILTIN_HOTKEY_ID & TExtId

  const hotkeyIds = Object.values(HOTKEY_ID) as Id[]
  const extendGlobalHotkeyBindings = options.extendGlobalHotkeyBindings ?? []
  const extendScopedHotkeyBindings = options.extendScopedHotkeyBindings ?? []

  const globalHotkeyBindings = [
    ...builtinGlobalHotkeyBindings,
    ...extendGlobalHotkeyBindings,
  ] as HotkeyBinding<Id, TContext>[]

  const menuSearchHotkeyBindings = [
    ...builtinMenuSearchHotkeyBindings,
  ] as HotkeyBinding<Id, TContext>[]

  const hotkeyBindings = [
    ...globalHotkeyBindings,
    ...menuSearchHotkeyBindings,
    ...extendScopedHotkeyBindings,
  ] as HotkeyBinding<Id, TContext>[]

  function useHotkey(id: Id, handler: HotkeyHandler, active: MaybeRefOrGetter<boolean> = true) {
    const binding = hotkeyBindings.find(item => item.id === id)
    let currentHandler: ((event: KeyboardEvent, hotkeyHandler: { key: string }) => void) | undefined

    function bind() {
      if (currentHandler || !binding) {
        return
      }
      const currentBinding = binding

      currentHandler = (event, hotkeyHandler) => {
        const hotkeyContext = options.getContext()
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

  function useHotkeyBindings(handlers: HotkeyHandlersMap<Id>, active: MaybeRefOrGetter<boolean> = true) {
    hotkeyIds.forEach((id) => {
      const handler = handlers[id]
      if (handler) {
        useHotkey(id, handler, active)
      }
    })
  }

  if (import.meta.env.DEV) {
    const registeredIds = hotkeyBindings.map(item => item.id)
    const missingIds = hotkeyIds.filter(id => !registeredIds.includes(id))
    const duplicateIds = registeredIds.filter((id, index) => registeredIds.indexOf(id) !== index)

    if (missingIds.length || duplicateIds.length) {
      console.warn('[hotkeys] registry consistency check failed', {
        missingIds,
        duplicateIds: [...new Set(duplicateIds)],
      })
    }
  }

  return {
    HOTKEY_ID,
    hotkeyIds,
    globalHotkeyBindings,
    menuSearchHotkeyBindings,
    hotkeyBindings,
    useHotkey,
    useHotkeyBindings,
  }
}
