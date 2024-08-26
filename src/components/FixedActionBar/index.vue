<script setup lang="ts">
defineOptions({
  name: 'FixedActionBar',
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
  <div
    class="fixed-action-bar bottom-0 z-4 bg-[var(--g-container-bg)] p-5 text-center transition" :class="{ shadow: !isBottom }" data-fixed-calc-width
  >
    <slot />
  </div>
</template>

<style scoped>
.fixed-action-bar {
  box-shadow: 0 0 1px 0 var(--g-box-shadow-color);

  &.shadow {
    box-shadow: 0 -10px 10px -10px var(--g-box-shadow-color);
  }
}
</style>
