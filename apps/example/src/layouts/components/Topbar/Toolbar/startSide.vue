<script setup lang="ts">
import { useSlots } from '@/slots'
import Tools from './tools.vue'

defineOptions({
  name: 'ToolbarLeftSide',
})

const appSettingsStore = useAppSettingsStore()
</script>

<template>
  <div class="flex items-center">
    <FaButton v-if="appSettingsStore.mode === 'mobile'" variant="ghost" size="icon" class="h-9 w-9 -rotate-z-180" @click="appSettingsStore.toggleSidebarCollapse()">
      <FaIcon name="app-toolbar-collapse" class="size-4" />
    </FaButton>
    <Component :is="useSlots('toolbar-start')" />
    <Tools mode="left-side" />
  </div>
</template>
