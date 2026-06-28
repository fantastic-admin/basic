<script setup lang="ts">
import { useElementSize, useScroll } from '@vueuse/core'
import eventBus from '@/utils/eventBus'
import Tabbar from './Tabbar/index.vue'
import Toolbar from './Toolbar/index.vue'

defineOptions({
  name: 'Topbar',
})

defineProps<{
  enable: boolean
  enableTabbar: boolean
  enableToolbar: boolean
}>()

const appSettingsStore = useAppSettingsStore()

const { height: topbarHeight } = useElementSize(useTemplateRef('topbarRef'))
const { y } = useScroll(window)
const scrollOnHide = ref(false)

watch(y, (val, oldVal) => {
  scrollOnHide.value = appSettingsStore.settings.topbar.mode === 'sticky' && val > (oldVal ?? 0) && val > topbarHeight.value
})

watch(scrollOnHide, (val) => {
  eventBus.emit('topbar-scroll-visible-or-hidden', val)
}, {
  immediate: true,
})
</script>

<template>
  <Transition name="topbar">
    <div
      v-if="enable" ref="topbarRef" class="flex flex-col w-full shadow-[0_1px_0_0_oklch(var(--border))] transition-transform-300"
    >
      <Tabbar v-if="enableTabbar" class="z-2" />
      <Toolbar v-if="enableToolbar" class="z-1" />
    </div>
  </Transition>
</template>

<style scoped>
/* 顶栏动画 */
.topbar-enter-active,
.topbar-leave-active {
  transition: transform 0.3s;
}

.topbar-enter-from,
.topbar-leave-to {
  transform: translateY(calc(var(--g-topbar-height) * -1));
}
</style>
