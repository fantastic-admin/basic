<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const flip = ref<'horizontal' | 'vertical' | 'both'>()
const rotate = ref(0)
</script>

<template>
  <div>
    <PageHeader title="SVG Icon" content="可以使用自定义的 SVG 图标" />
    <PageMain>
      <p>单色 SVG Icon</p>
      <SvgIcon name="example-emotion-line" :size="48" :flip="flip" :rotate="rotate" />
      <SvgIcon name="example-emotion-laugh-line" :size="48" :flip="flip" :rotate="rotate" />
      <SvgIcon name="example-emotion-unhappy-line" :size="48" :flip="flip" :rotate="rotate" />
      <p>彩色 SVG Icon</p>
      <SvgIcon name="example-crown" :size="48" :flip="flip" :rotate="rotate" />
      <SvgIcon name="example-star" :size="48" :flip="flip" :rotate="rotate" />
      <SvgIcon name="example-vip" :size="48" :flip="flip" :rotate="rotate" />
      <div>
        <p>翻转：</p>
        <ElRadioGroup v-model="flip">
          <ElRadioButton label="">
            无
          </ElRadioButton>
          <ElRadioButton label="horizontal">
            水平翻转
          </ElRadioButton>
          <ElRadioButton label="vertical">
            垂直翻转
          </ElRadioButton>
          <ElRadioButton label="both">
            水平垂直翻转
          </ElRadioButton>
        </ElRadioGroup>
        <p>旋转：</p>
        <ElSlider v-model="rotate" :min="0" :max="360" style="width: 50%;" />
      </div>
      <p>使用方法：</p>
      <ol>
        <li>上 <a href="https://www.iconfont.cn/" target="_blank">Iconfont</a> 下载需要的 svg 图标</li>
        <li>将 svg 文件放入 ./src/assets/icons 目录下，文件名即为 name</li>
      </ol>
    </PageMain>
  </div>
</template>
