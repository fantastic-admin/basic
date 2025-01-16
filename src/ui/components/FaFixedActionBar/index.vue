<script setup lang="ts">
import { useElementSize } from '@vueuse/core'

defineOptions({
  name: 'FaFixedActionBar',
})

const actionBarRef = useTemplateRef('actionBarRef')
const { height } = useElementSize(actionBarRef)
watch(height, (val) => {
  document.documentElement.style.setProperty('--g-main-container-padding-bottom', `${val}px`)
}, {
  immediate: true,
})
onUnmounted(() => {
  document.documentElement.style.removeProperty('--g-main-container-padding-bottom')
})

const isBottom = ref(false)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onScroll() {
  // 变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 变量windowHeight是可视区的高度
  const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
  // 变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  // 滚动条到底部
  isBottom.value = Math.ceil(scrollTop + windowHeight) >= scrollHeight
}
</script>

<template>
  <FaSmartFixedBlock position="bottom">
    <div ref="actionBarRef">
      <div class="relative bottom-0 z-4 border-t bg-background p-5 text-center transition before:(pointer-events-none absolute left-0 z-1 h-12 w-full from-transparent to-[var(--g-main-area-bg)] bg-gradient-to-b opacity-0 transition-opacity content-empty -top-1px -translate-y-full)" :class="{ 'before:(opacity-100)': !isBottom }">
        <slot />
      </div>
    </div>
  </FaSmartFixedBlock>
</template>
