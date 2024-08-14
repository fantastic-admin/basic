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

const fa = new URL('@/assets/images/logo.png', import.meta.url).href

const flip = ref<'horizontal' | 'vertical' | 'both'>()
const rotate = ref(0)
</script>

<template>
  <div>
    <PageHeader title="Image Icon" content="可以使用本地或网络图片" />
    <PageMain>
      <p>网络图片</p>
      <SvgIcon :name="webImage" :size="48" :flip="flip" :rotate="rotate" />
      <div class="space-x-2">
        <HButton @click="change">
          更改图片
        </HButton>
        <HButton @click="webImage = ''">
          创建错误
        </HButton>
      </div>
      <p>本地图片</p>
      <SvgIcon :name="fa" :size="48" :flip="flip" :rotate="rotate" />
      <div>
        <p>翻转：</p>
        <ElRadioGroup v-model="flip">
          <ElRadioButton value="">
            无
          </ElRadioButton>
          <ElRadioButton value="horizontal">
            水平翻转
          </ElRadioButton>
          <ElRadioButton value="vertical">
            垂直翻转
          </ElRadioButton>
          <ElRadioButton value="both">
            水平垂直翻转
          </ElRadioButton>
        </ElRadioGroup>
        <p>旋转：</p>
        <ElSlider v-model="rotate" :min="0" :max="360" style="width: 50%;" />
      </div>
    </PageMain>
  </div>
</template>
