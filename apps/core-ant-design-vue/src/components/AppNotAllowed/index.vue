<script setup lang="ts">
defineOptions({
  name: 'AppNotAllowed',
})

const route = useRoute()
const router = useRouter()

const appSettingsStore = useAppSettingsStore()
const appTabbarStore = useAppTabbarStore()

onMounted(() => {
  if (appSettingsStore.settings.topbar.tabbar) {
    appTabbarStore.remove(route.meta.activeMenu || route.fullPath)
  }
})

function goBack() {
  router.push(appSettingsStore.settings.app.home.fullPath)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex h-[5vh] lg:h-[10vh]">
      <div class="w-[5vh] lg:w-[10vh]" />
      <div class="border-inline border-dashed flex-1" />
      <div class="w-[5vh] lg:w-[10vh]" />
    </div>
    <div class="border-block border-dashed flex flex-1">
      <div class="w-[5vh] lg:w-[10vh]" />
      <div class="border-inline border-dashed flex-center flex-1 relative">
        <div class="p-4 flex-col-center gap-4 lg:p-12">
          <h1 class="text-6xl font-bold m-0 lg:text-9xl">
            403
          </h1>
          <div class="text-xl text-secondary-foreground/50 mx-0 text-center">
            抱歉，你无权访问该页面
          </div>
          <FaButton variant="link" class="text-unset" @click="goBack">
            返回主页
          </FaButton>
        </div>
      </div>
      <div class="w-[5vh] lg:w-[10vh]" />
    </div>
    <div class="flex h-[5vh] lg:h-[10vh]">
      <div class="w-[5vh] lg:w-[10vh]" />
      <div class="border-inline border-dashed flex-1" />
      <div class="w-[5vh] lg:w-[10vh]" />
    </div>
  </div>
</template>
