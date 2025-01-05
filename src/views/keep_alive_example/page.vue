<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import useKeepAliveStore from '@/store/modules/keepAlive'

defineOptions({
  name: 'KeepAliveExamplePage',
})

const router = useRouter()

const keepAliveStore = useKeepAliveStore()

const openKeepAlive = ref(false)
const num = ref(1)

function go(type: number) {
  let routerName
  switch (type) {
    case 1:
      routerName = 'keepAliveExampleDetail'
      break
    case 2:
      routerName = 'keepAliveExampleNestedDetail'
      break
  }
  router.push({
    name: routerName,
  })
}

onBeforeRouteLeave((to, from) => {
  const componentName = from.matched.at(-1)?.components?.default.name
  if (!componentName) {
    return
  }
  if (openKeepAlive.value) {
    // 因为并不是所有的路由跳转都需要将当前页面进行缓存，例如最常见的情况，从列表页进入详情页，则需要将列表页缓存，而从列表页跳转到其它页面，则不需要将列表页缓存
    // 所以下面的代码意思就是，如果目标路由的 name 是 keepAliveExampleDetail 或者 keepAliveExampleNestedDetail ，则将当前页面组件的 name 添加进 keep-alive 中，否则则删除
    if (['keepAliveExampleDetail', 'keepAliveExampleNestedDetail'].includes(to.name as string)) {
      keepAliveStore.add(componentName)
    }
    else {
      keepAliveStore.remove(componentName)
    }
  }
  else {
    keepAliveStore.remove(componentName)
  }
})
</script>

<template>
  <div>
    <FaPageHeader title="页面缓存" description="除了可以在路由里配置页面是否需要缓存外，你也可以不使用框架提供的方法，而是在页面里自行实现。" />
    <FaPageMain>
      <div class="space-y-2">
        <div class="flex-center-start gap-2 text-sm">
          关闭缓存
          <FaSwitch v-model="openKeepAlive" />
          开启缓存
        </div>
        <ElInputNumber v-model="num" />
        <div class="space-x-2">
          <FaButton @click="go(1)">
            进入同级路由页面
          </FaButton>
          <FaButton @click="go(2)">
            进入下级路由页面
          </FaButton>
        </div>
      </div>
    </FaPageMain>
  </div>
</template>
