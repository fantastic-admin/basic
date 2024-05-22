<script setup lang="ts">
defineOptions({
  name: 'BackTop',
})

const transitionClass = {
  enterActiveClass: 'ease-out duration-300',
  enterFromClass: 'opacity-0 translate-y-4 lg-translate-y-0 lg-scale-95',
  enterToClass: 'opacity-100 translate-y-0 lg-scale-100',
  leaveActiveClass: 'ease-in duration-200',
  leaveFromClass: 'opacity-100 translate-y-0 lg-scale-100',
  leaveToClass: 'opacity-0 translate-y-4 lg-translate-y-0 lg-scale-95',
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollTop = ref<number | null>(null)
function handleScroll() {
  scrollTop.value = document.documentElement.scrollTop
}

function handleClick() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition v-bind="transitionClass">
      <div v-if="scrollTop && scrollTop >= 200" class="fixed bottom-4 right-4 z-1000 h-12 w-12 flex cursor-pointer items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-stone-3 ring-inset dark-bg-dark hover-bg-stone-1 dark-ring-stone-7 dark-hover-bg-dark/50" @click="handleClick">
        <SvgIcon name="i-icon-park-outline:to-top-one" :size="24" />
      </div>
    </Transition>
  </Teleport>
</template>
