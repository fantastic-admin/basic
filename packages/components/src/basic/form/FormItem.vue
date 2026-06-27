<script lang="ts">
import type {
  ComponentFieldBindingObject,
  RuleExpression,
} from 'vee-validate'
import type { CSSProperties, HTMLAttributes, VNode, VNodeChild } from 'vue'
import type { FormLabelPlacement } from './context'
</script>

<script setup lang="ts" generic="TValue = unknown">
import { useId } from 'reka-ui'
import { useField } from 'vee-validate'
import { cloneVNode, Comment, computed, defineComponent, Fragment, h, inject, isVNode, onBeforeUnmount, onMounted, provide, toRef, useTemplateRef, watch } from 'vue'
import { cn } from '#utils'
import { FORM_LAYOUT_INJECTION_KEY } from './context'
import FormControl from './form/FormControl.vue'
import FormDescription from './form/FormDescription.vue'
import FormLabel from './form/FormLabel.vue'
import FormMessage from './form/FormMessage.vue'
import { FORM_ITEM_INJECTION_KEY } from './form/injectionKeys'

export interface FormItemProps<TValue = unknown> {
  name: string
  label?: string
  description?: string
  rules?: RuleExpression<TValue>
  required?: boolean
  autoBind?: boolean
  labelPlacement?: FormLabelPlacement
  labelWidth?: string | number
  class?: HTMLAttributes['class']
  labelClass?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
  messageClass?: HTMLAttributes['class']
  descriptionClass?: HTMLAttributes['class']
}

export interface FormItemSlotProps<TValue = unknown> {
  componentField: ComponentFieldBindingObject<TValue>
}

type EventHandler = ((...args: any[]) => unknown) | ((...args: any[]) => unknown)[]

defineOptions({
  name: 'BuiltInFormItem',
})

const props = withDefaults(defineProps<FormItemProps<TValue>>(), {
  autoBind: true,
})

const slots = defineSlots<{
  default?: (props: FormItemSlotProps<TValue>) => any
  label?: (props: FormItemSlotProps<TValue>) => any
  description?: (props: FormItemSlotProps<TValue>) => any
  message?: (props: FormItemSlotProps<TValue>) => any
}>()

const injectedFormContext = inject(FORM_LAYOUT_INJECTION_KEY)

if (!injectedFormContext) {
  throw new Error('FaFormItem should be used within <FaForm>.')
}

const formContext = injectedFormContext

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)

const itemRef = useTemplateRef<HTMLElement>('itemRef')
const field = useField<TValue>(toRef(props, 'name'), toRef(props, 'rules'), {
  label: toRef(props, 'label'),
  validateOnValueUpdate: true,
})

const resolvedLabelPlacement = computed(() => props.labelPlacement ?? formContext.labelPlacement.value)
const resolvedLabelWidth = computed(() => props.labelWidth ?? formContext.labelWidth.value)
const resolvedDisabled = computed(() => formContext.disabled.value)

const rootClass = computed(() => cn(
  'min-w-0',
  resolvedLabelPlacement.value === 'top'
    ? 'grid gap-2'
    : 'grid gap-2 sm:grid-cols-[var(--fa-form-label-width)_minmax(0,1fr)] sm:items-start sm:gap-x-3',
  props.class,
))

const rootStyle = computed<CSSProperties>(() => ({
  '--fa-form-label-width': resolveSize(resolvedLabelWidth.value),
}))

const labelClass = computed(() => cn(
  'text-sm font-medium leading-none',
  resolvedLabelPlacement.value === 'top'
    ? 'inline-flex items-center gap-1 px-1'
    : 'flex min-h-9 items-center gap-1 sm:pt-0',
  resolvedLabelPlacement.value === 'right' && 'sm:justify-end sm:text-right',
  resolvedLabelPlacement.value === 'left' && 'sm:justify-start sm:text-left',
  props.labelClass,
))

const contentClass = computed(() => cn(
  'grid min-w-0 gap-1',
  resolvedLabelPlacement.value !== 'top' && 'sm:col-start-2',
  props.contentClass,
))

const hasMessage = computed(() => Boolean(field.errorMessage.value))
const hasDescription = computed(() => Boolean(props.description || slots.description))
const feedbackClass = computed(() => cn('grid min-h-4 px-1'))
const messageClass = computed(() => cn('col-start-1 row-start-1 text-xs', props.messageClass))
const descriptionClass = computed(() => cn(
  'col-start-1 row-start-1 text-xs',
  hasMessage.value && 'invisible',
  props.descriptionClass,
))

function handleUpdateModelValue(value: TValue) {
  field.handleChange(value, true)
}

function handleBlur(event: Event) {
  field.handleBlur(event, true)
}

function handleInput(event: Event | unknown) {
  field.handleChange(event, true)
}

function handleChange(event: Event | unknown) {
  field.handleChange(event, true)
}

const componentField = computed<ComponentFieldBindingObject<TValue>>(() => ({
  'name': props.name,
  'modelValue': field.value.value,
  'onBlur': handleBlur,
  'onInput': handleInput,
  'onChange': handleChange,
  'onUpdate:modelValue': handleUpdateModelValue,
}))

const slotProps = computed<FormItemSlotProps<TValue>>(() => ({
  componentField: componentField.value,
}))

const ControlSlot = defineComponent({
  name: 'BuiltInFormItemControlSlot',
  setup() {
    return () => {
      const nodes = normalizeSlotNodes(slots.default?.(slotProps.value) ?? [])

      if (!nodes.length) {
        return null
      }

      const [firstNode, ...restNodes] = nodes
      const controlNode = cloneVNode(firstNode, resolveControlProps(firstNode))

      return h(FormControl, null, {
        default: () => [controlNode, ...restNodes],
      })
    }
  },
})

function resolveSize(size?: string | number) {
  if (size == null || size === '') {
    return '96px'
  }

  return typeof size === 'number' ? `${size}px` : size
}

function normalizeSlotNodes(nodes: VNodeChild): VNode[] {
  const result: VNode[] = []
  const source = Array.isArray(nodes) ? nodes : [nodes]

  source.forEach((node) => {
    if (Array.isArray(node)) {
      result.push(...normalizeSlotNodes(node))
      return
    }

    if (!isVNode(node) || node.type === Comment) {
      return
    }

    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...normalizeSlotNodes(node.children as VNodeChild[]))
      return
    }

    result.push(node)
  })

  return result
}

function resolveControlProps(vnode: VNode) {
  if (!props.autoBind) {
    return {}
  }

  const vnodeProps = vnode.props ?? {}
  const nextProps: Record<string, unknown> = {
    'name': props.name,
    'disabled': resolvedDisabled.value || Boolean(vnodeProps.disabled),
    'aria-required': props.required ? 'true' : undefined,
    'onBlur': chainHandlers(vnodeProps.onBlur as EventHandler | undefined, componentField.value.onBlur),
    'onInput': chainHandlers(vnodeProps.onInput as EventHandler | undefined, componentField.value.onInput),
    'onChange': chainHandlers(vnodeProps.onChange as EventHandler | undefined, componentField.value.onChange),
    'onUpdate:modelValue': chainHandlers(vnodeProps['onUpdate:modelValue'] as EventHandler | undefined, componentField.value['onUpdate:modelValue']!),
  }

  if (!Object.hasOwn(vnodeProps, 'modelValue')) {
    nextProps.modelValue = componentField.value.modelValue
  }

  return nextProps
}

function chainHandlers<T extends (...args: any[]) => unknown>(existing: EventHandler | undefined, next: T) {
  if (!existing || existing === next) {
    return next
  }

  return (...args: Parameters<T>) => {
    next(...args)
    callHandler(existing, ...args)
  }
}

function callHandler(handler: EventHandler, ...args: any[]) {
  if (Array.isArray(handler)) {
    handler.forEach(item => item(...args))
    return
  }

  handler(...args)
}

function registerCurrentField() {
  if (itemRef.value) {
    formContext.registerField(props.name, itemRef.value)
  }
}

function unregisterCurrentField(name = props.name) {
  formContext.unregisterField(name, itemRef.value ?? undefined)
}

onMounted(() => {
  registerCurrentField()
})

watch(() => props.name, (name, oldName) => {
  if (oldName) {
    unregisterCurrentField(oldName)
  }
  if (name) {
    registerCurrentField()
  }
})

onBeforeUnmount(() => {
  unregisterCurrentField()
})
</script>

<template>
  <div
    ref="itemRef"
    data-slot="form-item"
    :class="rootClass"
    :style="rootStyle"
  >
    <FormLabel
      v-if="props.label || $slots.label"
      :class="labelClass"
    >
      <slot name="label" v-bind="slotProps">
        <span>{{ props.label }}</span>
        <span v-if="props.required" class="text-destructive" aria-hidden="true">*</span>
      </slot>
    </FormLabel>
    <div :class="contentClass">
      <ControlSlot />
      <div :class="feedbackClass">
        <FormDescription
          v-if="hasDescription"
          :class="descriptionClass"
          :aria-hidden="hasMessage ? 'true' : undefined"
        >
          <slot name="description" v-bind="slotProps">
            {{ props.description }}
          </slot>
        </FormDescription>
        <FormMessage
          v-if="hasMessage"
          :class="messageClass"
        >
          <template #default="{ message }">
            <slot name="message" v-bind="slotProps">
              {{ message }}
            </slot>
          </template>
        </FormMessage>
      </div>
    </div>
  </div>
</template>
