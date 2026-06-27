import type { ComputedRef, InjectionKey } from 'vue'

export type FormLabelPlacement = 'top' | 'left' | 'right'

export interface FormLayoutContext {
  labelPlacement: ComputedRef<FormLabelPlacement>
  labelWidth: ComputedRef<string | number | undefined>
  disabled: ComputedRef<boolean>
  registerField: (name: string, el: HTMLElement) => void
  unregisterField: (name: string, el?: HTMLElement) => void
}

export const FORM_LAYOUT_INJECTION_KEY: InjectionKey<FormLayoutContext> = Symbol('form-layout')
