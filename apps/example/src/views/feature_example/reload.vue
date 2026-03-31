<script setup lang="ts">
defineOptions({
  name: 'FeatureExampleReload',
})

const mainPage = useAppPage()

const text = ref('')

function reload() {
  mainPage.reload()
}
</script>

<template>
  <div>
    <FaPageHeader title="页面刷新" description="手动刷新当前页面" />
    <FaPageMain main-class="space-y-2">
      <p>该特性无视页面保活，意味着即便当前页面开启了页面保活，手动刷新也会强制清除当前页面内的组件和数据的状态。</p>
      <FaInput v-model="text" />
      <FaButton @click="reload">
        刷新
      </FaButton>
    </FaPageMain>
  </div>
</template>
