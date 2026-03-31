<script setup lang="ts">
import { useClipboard, useDebounceFn, useThrottleFn } from '@vueuse/core'

function message() {
  faToast.success('Toast')
}

const debounce = useDebounceFn(() => {
  message()
}, 1000)

const throttle = useThrottleFn(() => {
  message()
}, 1000)

const input = ref('test')
const { text, copy, copied, isSupported } = useClipboard()
watch(copied, (val) => {
  val && faToast.success(text.value)
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <FaPageHeader title="VueUse" description="VueUse 是一个 Vue Composition API 实用程序的集合，更多 API 和例子请查看 VueUse 官网。">
      <FaButton variant="outline" size="icon" @click="open('https://github.com/vueuse/vueuse')">
        <FaIcon name="i-simple-icons:github" />
      </FaButton>
    </FaPageHeader>
    <FaPageMain title="debounce" main-class="flex-col-start gap-2">
      <p class="mt-0">
        所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
      </p>
      <FaButton @click="debounce">
        连续点击我，只会执行最后一次点击事件
      </FaButton>
    </FaPageMain>
    <FaPageMain title="throttle" main-class="flex-col-start gap-2">
      <p class="mt-0">
        所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。
      </p>
      <FaButton @click="throttle">
        连续点击我，每一秒只会执行一次点击事件
      </FaButton>
    </FaPageMain>
    <FaPageMain v-if="isSupported" title="clipboard" main-class="flex-center-start gap-2">
      <FaInput v-model="input" />
      <FaButton @click="copy(input)">
        复制
      </FaButton>
    </FaPageMain>
  </div>
</template>
