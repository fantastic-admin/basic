<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import Message from 'vue-m-message'

defineOptions({
  name: 'LinkView',
})

const route = useRoute()

const { copy, copied } = useClipboard()
watch(copied, (val) => {
  val && Message.success('复制成功', {
    zIndex: 2000,
  })
})

function open() {
  window.open(route.meta.link, '_blank')
}
</script>

<template>
  <div class="absolute h-full w-full flex flex-col">
    <Transition name="slide-right" mode="out-in" appear>
      <PageMain :key="route.meta.link" class="flex flex-1 flex-col justify-center">
        <div class="flex flex-col items-center">
          <SvgIcon name="i-icon-park-twotone:planet" :size="120" class="text-ui-primary/80" />
          <div class="my-2 text-xl text-dark dark-text-white">
            是否访问此链接
          </div>
          <div class="my-2 max-w-[300px] cursor-pointer text-center text-[14px] text-stone-5" @click="route.meta.link && copy(route.meta.link)">
            <HTooltip text="复制链接">
              <div class="line-clamp-3">
                {{ route.meta.link }}
              </div>
            </HTooltip>
          </div>
          <HButton class="my-4" @click="open">
            <SvgIcon name="i-ri:external-link-fill" />
            立即访问
          </HButton>
        </div>
      </PageMain>
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
