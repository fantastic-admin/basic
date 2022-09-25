<script lang="ts" setup name="FixedActionBar">
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
  <div class="actionbar" :class="{ shadow: !isBottom }" data-fixed-calc-width>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.actionbar {
  z-index: 4;
  bottom: 0;
  padding: 20px;
  text-align: center;
  background-color: var(--g-app-bg);
  box-shadow: 0 0 1px 0 var(--g-box-shadow-color);
  transition: all 0.3s, var(--el-transition-box-shadow);

  &.shadow {
    box-shadow: 0 -10px 10px -10px var(--g-box-shadow-color);
  }
}

:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
