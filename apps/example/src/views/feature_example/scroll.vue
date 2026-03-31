<script setup lang="ts">
defineOptions({
  name: 'FeatureExampleScroll',
})

const scrollTop = ref(0)

// 激活时定位到之前的滚动位置
onActivated(() => {
  nextTick(() => {
    document.documentElement.scrollTop = scrollTop.value
  })
})

// 离开时记录当前页面滚动位置
onBeforeRouteLeave((_to, _from, next) => {
  scrollTop.value = document.documentElement.scrollTop
  next()
})
</script>

<template>
  <div>
    <FaPageHeader title="记录滚动位置" description="当前路由需开启页面保活。你可以滚动当前页，然后跳转到其它页面，再回来时会自动定位到离开时的滚动位置" />
    <FaPageMain main-class="space-y-2">
      <div v-for="i in 100" :key="i" class="p-4 border flex-center">
        {{ i }}
      </div>
    </FaPageMain>
  </div>
</template>
