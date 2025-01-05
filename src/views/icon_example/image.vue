<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const webImage = ref('https://picsum.photos/50')
function change() {
  webImage.value = ''
  webImage.value = `https://picsum.photos/50?random=${Math.random()}`
}

const fa = new URL('@/assets/images/logo.svg', import.meta.url).href
</script>

<template>
  <div>
    <FaPageHeader title="Image Icon" description="可以使用本地或网络图片" />
    <FaPageMain>
      <p>网络图片</p>
      <FaIcon :name="webImage" class="size-12" />
      <div class="space-x-2">
        <FaButton @click="change">
          更改图片
        </FaButton>
        <FaButton @click="webImage = ''">
          创建错误
        </FaButton>
      </div>
      <p>本地图片</p>
      <FaIcon :name="fa" class="size-12" />
    </FaPageMain>
  </div>
</template>
