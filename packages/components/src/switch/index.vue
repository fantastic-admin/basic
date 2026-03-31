<script setup lang="ts">
import { Switch } from './switch'

defineOptions({
  name: 'FaSwitch',
})

const props = defineProps<{
  disabled?: boolean
  onIcon?: string
  offIcon?: string
  beforeChange?: () => boolean | Promise<boolean>
}>()

const enabled = defineModel<boolean>()

async function handleChange(value: boolean) {
  if (!props.beforeChange) {
    enabled.value = value
    return
  }
  try {
    const result = await Promise.resolve(props.beforeChange())
    if (result) {
      enabled.value = value
    }
  }
  catch {}
}
</script>

<template>
  <Switch :model-value="enabled" :disabled @update:model-value="handleChange">
    <template #thumb>
      <FaIcon v-if="(enabled && onIcon) || (!enabled && offIcon)" :name="(enabled ? onIcon : offIcon) as string" class="text-foreground size-3" />
    </template>
  </Switch>
</template>
