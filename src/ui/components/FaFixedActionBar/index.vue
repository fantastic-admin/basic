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
      <div class="fixed-action-bar bottom-0 z-4 border-t bg-background p-5 text-center transition" :class="{ mask: !isBottom }">
        <slot />
      </div>
    </div>
  </FaSmartFixedBlock>
</template>

<style scoped>
.fixed-action-bar {
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 50px;
    pointer-events: none;
    content: "";
    background-image: linear-gradient(180deg, transparent, var(--g-main-area-bg));
    box-shadow: 0 1px 0 0 hsl(var(--border));
    opacity: 0;
    transition: opacity 0.3s;
    transform: translateY(-100%);
  }

  &.mask::before {
    opacity: 1;
  }
}
</style>
