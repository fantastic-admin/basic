<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
defineOptions({
  name: 'FeatureExampleReload',
})

const mainPage = useMainPage()

const text = ref('')

function reload() {
  mainPage.reload()
}
</script>

<template>
  <div>
    <PageHeader title="主页面刷新" content="重新渲染当前页面" />
    <PageMain>
      <p>该特性无视页面缓存，意味着即便当前页面开启了页面缓存，手动刷新也会强制清除当前页面内的组件和数据的状态。</p>
      <ElInput v-model="text" />
      <ElButton @click="reload">
        刷新
      </ElButton>
    </PageMain>
  </div>
</template>
