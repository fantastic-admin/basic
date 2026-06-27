<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'
import { cn } from '#utils'
import { useFormField } from './useFormField'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

defineSlots<{
  default?: (props: { message: string | undefined }) => any
}>()

const { name, formMessageId } = useFormField()
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    data-slot="form-message"
    as="p"
    :name="toValue(name)"
    :class="cn('text-destructive text-sm', props.class)"
  >
    <template #default="{ message }">
      <slot :message="message">
        {{ message }}
      </slot>
    </template>
  </ErrorMessage>
</template>
