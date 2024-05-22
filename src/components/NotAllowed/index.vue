<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'NotAllowed',
})

const router = useRouter()

const settingsStore = useSettingsStore()

const data = ref({
  inter: Number.NaN,
  countdown: 5,
})

onUnmounted(() => {
  data.value.inter && window.clearInterval(data.value.inter)
})

onMounted(() => {
  data.value.inter = window.setInterval(() => {
    data.value.countdown--
    if (data.value.countdown === 0) {
      data.value.inter && window.clearInterval(data.value.inter)
      goBack()
    }
  }, 1000)
})

function goBack() {
  router.push(settingsStore.settings.home.fullPath)
}
</script>

<template>
  <div class="absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg-flex-row -translate-x-50% -translate-y-50% lg-gap-12">
    <SvgIcon name="403" class="text-[300px] lg-text-[400px]" />
    <div class="flex flex-col gap-4">
      <h1 class="m-0 text-6xl font-sans">
        403
      </h1>
      <div class="desc mx-0 text-xl text-stone-5">
        抱歉，你无权访问该页面
      </div>
      <div>
        <HButton @click="goBack">
          {{ data.countdown }} 秒后，返回首页
        </HButton>
      </div>
    </div>
  </div>
</template>
