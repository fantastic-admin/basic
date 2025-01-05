<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { toast } from 'vue-sonner'

defineOptions({
  name: 'LinkView',
})

const route = useRoute()

const { copy, copied } = useClipboard()
watch(copied, (val) => {
  val && toast.success('复制成功')
})

function open() {
  window.open(route.meta.link, '_blank')
}
</script>

<template>
  <div class="absolute h-full w-full flex flex-col">
    <Transition name="slide-right" mode="out-in" appear>
      <FaPageMain :key="route.meta.link" class="flex flex-1 flex-col justify-center">
        <div class="flex flex-col items-center">
          <FaIcon name="i-icon-park-twotone:planet" class="size-30 text-primary/80" />
          <div class="my-2 text-xl text-dark dark-text-white">
            是否访问此链接
          </div>
          <div class="my-2 max-w-[300px] cursor-pointer text-center text-[14px] text-secondary-foreground/50" @click="route.meta.link && copy(route.meta.link)">
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
.slide-right-enter-active {
  transition: 0.2s;
}

.slide-right-leave-active {
  transition: 0.15s;
}

.slide-right-enter-from {
  margin-left: -20px;
  opacity: 0;
}

.slide-right-leave-to {
  margin-left: 20px;
  opacity: 0;
}
</style>
