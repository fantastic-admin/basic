<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

defineOptions({
  name: 'LinkView',
})

const route = useRoute()
const { copy, copied } = useClipboard()
watch(copied, (val) => {
  val && faToast.success('复制成功')
})

function open() {
  window.open(route.meta.link, '_blank')
}
</script>

<template>
  <div class="flex flex-col h-full w-full absolute">
    <Transition name="fade" mode="out-in" appear>
      <FaPageMain :key="route.meta.link" class="flex flex-1 flex-col justify-center">
        <div class="flex flex-col items-center">
          <FaIcon name="i-icon-park-twotone:planet" class="text-primary/80 size-30" />
          <div class="text-xl text-dark my-2 dark-text-white">
            是否访问此链接
          </div>
          <div class="text-[14px] text-secondary-foreground/50 my-2 text-center max-w-[300px] cursor-pointer" @click="route.meta.link && copy(route.meta.link)">
            <FaTooltip text="复制链接">
              <div class="line-clamp-3">
                {{ route.meta.link }}
              </div>
            </FaTooltip>
          </div>
          <FaButton class="my-4" @click="open">
            <FaIcon name="i-ri:external-link-fill" />
            立即访问
          </FaButton>
        </div>
      </FaPageMain>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: 0.2s;
}

.fade-leave-active {
  transition: 0.15s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
