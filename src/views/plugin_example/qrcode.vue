<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import QRCode from 'qrcode'
import Alert from './components/alert.vue'
import Command from './components/command.vue'

const url1 = ref('')
const url2 = ref('')
const url3 = ref('')

const canvasRef = useTemplateRef('canvasRef')

onMounted(() => {
  // 渲染成 img 标签
  QRCode.toDataURL('Fantastic-admin 真棒！').then((url: string) => {
    url1.value = url
  }).catch((err: any) => {
    // eslint-disable-next-line no-console
    console.log(err)
  })
  // 渲染成 canvas 标签
  QRCode.toCanvas(canvasRef.value, 'Fantastic-admin 真棒！').then(() => {
    // 渲染成功
  }).catch((err: any) => {
    // eslint-disable-next-line no-console
    console.log(err)
  })
  // 自定义颜色
  QRCode.toDataURL('Fantastic-admin 真棒！', {
    color: {
      dark: '#5482EE',
      light: '#E8E8E8',
    },
  }).then((url: string) => {
    url2.value = url
  }).catch((err: any) => {
    // eslint-disable-next-line no-console
    console.log(err)
  })
  // 指定宽度
  QRCode.toDataURL('Fantastic-admin 真棒！', {
    width: 100,
  }).then((url: string) => {
    url3.value = url
  }).catch((err: any) => {
    // eslint-disable-next-line no-console
    console.log(err)
  })
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <FaPageHeader title="二维码">
      <template #description>
        <p>
          安装命令：
          <Command text="pnpm add qrcode" />
          <Command text="pnpm add @types/qrcode -D" />
        </p>
      </template>
      <FaButton variant="outline" @click="open('https://github.com/soldair/node-qrcode')">
        <FaIcon name="i-ep:link" />
        访问 node-qrcode
      </FaButton>
    </FaPageHeader>
    <div class="grid grid-cols-1 mx-4 gap-4 lg-grid-cols-2 xl-grid-cols-4">
      <FaPageMain title="渲染成 img 标签" class="m-0!">
        <img :src="url1">
      </FaPageMain>
      <FaPageMain title="渲染成 canvas 标签" class="m-0!">
        <canvas ref="canvasRef" />
      </FaPageMain>
      <FaPageMain title="自定义颜色" class="m-0!">
        <img :src="url2">
      </FaPageMain>
      <FaPageMain title="指定宽度" class="m-0!">
        <img :src="url3">
      </FaPageMain>
    </div>
  </div>
</template>
