<script setup lang="ts">
import { Switch } from './switch'

defineOptions({
  name: 'FaSwitch',
})

defineProps<{
  disabled?: boolean
  onIcon?: string
  offIcon?: string
}>()

const enabled = defineModel<boolean>()
</script>

<template>
  <Switch v-model="enabled" :disabled>
    <template #thumb>
      <FaIcon v-if="(enabled && onIcon) || (!enabled && offIcon)" :name="(enabled ? onIcon : offIcon) as string" class="h-3 w-3 text-foreground" />
    </template>
  </Switch>
</template>
