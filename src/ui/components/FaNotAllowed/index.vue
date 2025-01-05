<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'

defineOptions({
  name: 'FaNotAllowed',
})

const route = useRoute()
const router = useRouter()

const settingsStore = useSettingsStore()
const tabbarStore = useTabbarStore()

const data = ref({
  inter: Number.NaN,
  countdown: 5,
})

onUnmounted(() => {
  data.value.inter && window.clearInterval(data.value.inter)
})

onMounted(() => {
  if (settingsStore.settings.tabbar.enable) {
    tabbarStore.remove(route.meta.activeMenu || route.fullPath)
  }
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
    <FaIcon name="403" class="text-[300px] lg-text-[400px]" />
    <div class="flex flex-col gap-4">
      <h1 class="m-0 text-6xl font-sans">
        403
      </h1>
      <div class="desc mx-0 text-xl text-secondary-foreground/50">
        抱歉，你无权访问该页面
      </div>
      <div>
        <FaButton @click="goBack">
          {{ `${data.countdown} 秒后，返回主页` }}
        </FaButton>
      </div>
    </div>
  </div>
</template>
