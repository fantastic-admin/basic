<script setup lang="ts">
defineOptions({
  name: 'BackTop',
})

const transitionClass = {
  enterActiveClass: 'ease-out duration-300',
  enterFromClass: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
  enterToClass: 'opacity-100 translate-y-0 sm:scale-100',
  leaveActiveClass: 'ease-in duration-200',
  leaveFromClass: 'opacity-100 translate-y-0 sm:scale-100',
  leaveToClass: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
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
      <div v-if="scrollTop && scrollTop >= 200" class="fixed z-1000 right-4 bottom-4 w-12 h-12 flex justify-center items-center rounded-full cursor-pointer shadow-lg ring-1 ring-inset ring-stone-3 dark:ring-stone-7 bg-white dark:bg-dark hover:bg-stone-1 dark:hover:bg-dark/50" @click="handleClick">
        <SvgIcon name="icon-park-outline:to-top-one" :size="24" />
      </div>
    </Transition>
  </Teleport>
</template>
