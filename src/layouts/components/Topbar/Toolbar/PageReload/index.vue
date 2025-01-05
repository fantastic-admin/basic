<script setup lang="ts">
defineOptions({
  name: 'PageReload',
})

const mainPage = useMainPage()

const isAnimating = ref(false)

function handleClick() {
  isAnimating.value = true
  mainPage.reload()
}
</script>

<template>
  <FaButton variant="ghost" size="icon" @click="handleClick" @animationend="isAnimating = false">
    <FaIcon name="i-iconoir:refresh-double" :size="16" :class="{ animation: isAnimating }" />
  </FaButton>
</template>

<style scoped>
.animation {
  animation: animation 1s;
}

@keyframes animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
