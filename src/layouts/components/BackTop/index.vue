<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'

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

let timeout: (() => void) | undefined

const show = ref(false)
const scrollTop = ref(0)
function handleScroll() {
  scrollTop.value = document.documentElement.scrollTop
}
watch(scrollTop, (val) => {
  if (val >= 200) {
    handleMouseenter()
    handleMouseleave()
  }
})

function handleMouseenter() {
  timeout?.()
  // 此处setTimeout是为了避免移动端下和click事件同时触发
  setTimeout(() => {
    show.value = true
  }, 0)
}

function handleMouseleave() {
  ;({ stop: timeout } = useTimeoutFn(() => {
    show.value = false
  }, 2000))
}

function handleBackToTop() {
  show.value && document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition v-bind="transitionClass">
      <FaButton v-if="scrollTop >= 200" variant="outline" size="icon" class="fixed inset-b-4 z-1000 h-12 w-12 rounded-full transition-all -inset-e-9" :class="{ 'inset-e-3!': show }" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave" @click="handleBackToTop">
        <FaIcon name="i-icon-park-outline:to-top-one" class="size-6" />
      </FaButton>
    </Transition>
  </Teleport>
</template>
