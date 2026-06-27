<script lang="ts">
import type {
  FormErrors,
  FormMeta,
  FormOptions,
  FormState,
  FormValidationResult,
  GenericObject,
  GenericValidateFunction,
  InvalidSubmissionContext,
  Path,
  ResetFormOpts,
  SubmissionContext,
  TypedSchema,
  YupSchema,
} from 'vee-validate'
import type { HTMLAttributes, MaybeRef } from 'vue'
import type { FormLabelPlacement } from './context'
</script>

<script setup lang="ts" generic="TValues extends GenericObject = GenericObject, TOutput extends GenericObject = TValues">
import { cloneDeep, isEqual, isPlainObject } from 'es-toolkit'
import { useForm } from 'vee-validate'
import { computed, nextTick, provide, toRaw, toRef, watch } from 'vue'
import { cn } from '#utils'
import { FORM_LAYOUT_INJECTION_KEY } from './context'

export interface FormProps<
  TValues extends GenericObject = GenericObject,
  TOutput extends GenericObject = TValues,
> {
  as?: 'form' | 'div'
  model?: FormOptions<TValues, TOutput>['initialValues']
  validationSchema?: FormValidationSchema<TValues, TOutput>
  initialValues?: FormOptions<TValues, TOutput>['initialValues']
  initialErrors?: FormOptions<TValues, TOutput>['initialErrors']
  initialTouched?: FormOptions<TValues, TOutput>['initialTouched']
  validateOnMount?: FormOptions<TValues, TOutput>['validateOnMount']
  keepValuesOnUnmount?: FormOptions<TValues, TOutput>['keepValuesOnUnmount']
  name?: FormOptions<TValues, TOutput>['name']
  labelPlacement?: FormLabelPlacement
  labelWidth?: string | number
  disabled?: boolean
  scrollToError?: boolean
  class?: HTMLAttributes['class']
}

export type FormValidationSchema<
  TValues extends GenericObject = GenericObject,
  TOutput extends GenericObject = TValues,
> = MaybeRef<
  | Partial<Record<Path<TValues>, string | GenericValidateFunction<any> | GenericObject>>
  | TypedSchema<TValues, TOutput>
  | YupSchema<TValues>
  | undefined
>

export interface FormEmits<
  TValues extends GenericObject = GenericObject,
  TOutput extends GenericObject = TValues,
> {
  'update:model': [model: TValues]
  'submit': [values: TOutput, ctx: SubmissionContext<TValues>]
  'invalidSubmit': [ctx: InvalidSubmissionContext<TValues, TOutput>]
}

export interface FormSlotProps<
  TValues extends GenericObject = GenericObject,
  TOutput extends GenericObject = TValues,
> {
  values: TValues
  errors: FormErrors<TValues>
  meta: FormMeta<TValues>
  isSubmitting: boolean
  submitCount: number
  submit: () => Promise<void>
  validate: () => Promise<FormValidationResult<TValues, TOutput>>
  resetFields: (state?: Partial<FormState<TValues>>, opts?: ResetFormOpts) => void
  clearValidate: (name?: Path<TValues> | string) => void
  scrollToField: (name: Path<TValues> | string) => boolean
}

export interface FormExpose<
  TValues extends GenericObject = GenericObject,
  TOutput extends GenericObject = TValues,
> {
  submit: () => Promise<void>
  validate: () => Promise<FormValidationResult<TValues, TOutput>>
  resetFields: (state?: Partial<FormState<TValues>>, opts?: ResetFormOpts) => void
  clearValidate: (name?: Path<TValues> | string) => void
  setFieldValue: (name: Path<TValues> | string, value: unknown, shouldValidate?: boolean) => void
  setFieldError: (name: Path<TValues> | string, message?: string) => void
  scrollToField: (name: Path<TValues> | string) => boolean
}

defineOptions({
  name: 'BuiltInForm',
})

const props = withDefaults(defineProps<FormProps<TValues, TOutput>>(), {
  as: 'form',
  labelPlacement: 'top',
})

const emit = defineEmits<FormEmits<TValues, TOutput>>()

const fieldElements = new Map<string, HTMLElement>()

const form = useForm<TValues, TOutput>({
  validationSchema: toRef(props, 'validationSchema') as FormProps<TValues, TOutput>['validationSchema'],
  initialValues: cloneFormValue(props.model ?? props.initialValues),
  initialErrors: props.initialErrors,
  initialTouched: props.initialTouched,
  validateOnMount: props.validateOnMount,
  keepValuesOnUnmount: props.keepValuesOnUnmount,
  name: props.name,
})

let syncingFromModel = false
let syncingToModel = false

const resolvedLabelPlacement = computed(() => props.labelPlacement)
const resolvedLabelWidth = computed(() => props.labelWidth ?? '96px')
const resolvedDisabled = computed(() => Boolean(props.disabled))
const rootClass = computed(() => cn('grid gap-1', props.class))

const slotProps = computed<FormSlotProps<TValues, TOutput>>(() => ({
  values: form.values,
  errors: form.errors.value,
  meta: form.meta.value,
  isSubmitting: form.isSubmitting.value,
  submitCount: form.submitCount.value,
  submit,
  validate,
  resetFields,
  clearValidate,
  scrollToField,
}))

function registerField(name: string, el: HTMLElement) {
  fieldElements.set(name, el)
}

function unregisterField(name: string, el?: HTMLElement) {
  if (!el || fieldElements.get(name) === el) {
    fieldElements.delete(name)
  }
}

watch(
  () => props.model,
  (model) => {
    if (!model || syncingToModel) {
      return
    }

    const nextValues = cloneFormValue(model) as NonNullable<FormProps<TValues, TOutput>['model']>
    if (isEqual(toRaw(form.values), nextValues)) {
      return
    }

    syncingFromModel = true
    form.setValues(nextValues, false)
    void nextTick(() => {
      syncingFromModel = false
    })
  },
  { deep: true },
)

watch(
  form.values,
  (values) => {
    if (!props.model || syncingFromModel) {
      return
    }

    const nextModel = cloneFormValue(values) as TValues
    if (isEqual(toRaw(props.model), nextModel)) {
      return
    }

    syncingToModel = true
    syncModel(props.model as GenericObject, nextModel)
    emit('update:model', nextModel)
    void nextTick(() => {
      syncingToModel = false
    })
  },
  { deep: true },
)

provide(FORM_LAYOUT_INJECTION_KEY, {
  labelPlacement: resolvedLabelPlacement,
  labelWidth: resolvedLabelWidth,
  disabled: resolvedDisabled,
  registerField,
  unregisterField,
})

function validate() {
  return form.validate()
}

function resetFields(state?: Partial<FormState<TValues>>, opts?: ResetFormOpts) {
  form.resetForm(state, opts)
}

function clearValidate(name?: Path<TValues> | string) {
  if (name) {
    form.setFieldError(name as Path<TValues>, undefined)
    return
  }

  form.setErrors({})
}

function setFieldValue(name: Path<TValues> | string, value: unknown, shouldValidate = true) {
  form.setFieldValue(name as Path<TValues>, value as never, shouldValidate)
}

function setFieldError(name: Path<TValues> | string, message?: string) {
  form.setFieldError(name as Path<TValues>, message)
}

function cloneFormValue<T>(value: T): T {
  return cloneDeep(toRaw(value)) as T
}

function syncModel(target: GenericObject, source: GenericObject) {
  Object.keys(target).forEach((key) => {
    if (!Object.hasOwn(source, key)) {
      delete target[key]
    }
  })

  Object.entries(source).forEach(([key, value]) => {
    const currentValue = target[key]
    const rawCurrentValue = toRaw(currentValue)

    if (isPlainObject(rawCurrentValue) && isPlainObject(value)) {
      syncModel(currentValue as GenericObject, value as GenericObject)
      return
    }

    if (!isEqual(rawCurrentValue, value)) {
      target[key] = value
    }
  })
}

function scrollToField(name: Path<TValues> | string) {
  const el = fieldElements.get(String(name))

  if (!el) {
    return false
  }

  el.scrollIntoView({
    block: 'center',
    behavior: 'smooth',
  })
  focusFieldControl(el)
  return true
}

function focusFieldControl(el: HTMLElement) {
  const focusable = el.querySelector<HTMLElement>(
    '[data-slot="form-control"], input, textarea, select, button, [tabindex]:not([tabindex="-1"])',
  )

  focusable?.focus?.({ preventScroll: true })
}

async function handleInvalidSubmit(ctx: InvalidSubmissionContext<TValues, TOutput>) {
  emit('invalidSubmit', ctx)

  if (!props.scrollToError) {
    return
  }

  await nextTick()
  const [firstFieldName] = Object.keys(ctx.errors)

  if (firstFieldName) {
    scrollToField(firstFieldName)
  }
}

const submitForm = form.handleSubmit(
  (values, ctx) => emit('submit', values, ctx),
  ctx => void handleInvalidSubmit(ctx),
)

function submit() {
  return submitForm()
}

defineExpose<FormExpose<TValues, TOutput>>({
  submit,
  validate,
  resetFields,
  clearValidate,
  setFieldValue,
  setFieldError,
  scrollToField,
})
</script>

<template>
  <component
    :is="props.as"
    data-slot="form"
    :class="rootClass"
    @submit.prevent="submitForm"
  >
    <slot v-bind="slotProps" />
  </component>
</template>
