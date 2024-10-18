<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import Cropper from 'cropperjs'
import Alert from './components/alert.vue'
import 'cropperjs/dist/cropper.css'

let cropper: any = null
const imageRef = useTemplateRef('imageRef')
const cropImage = ref('')

onMounted(() => {
  if (!imageRef.value) {
    return
  }
  cropper = new Cropper(imageRef.value, {
    aspectRatio: 1,
    viewMode: 1,
    dragMode: 'move',
  })
})

function onCrop() {
  const canvas = cropper.getCroppedCanvas()
  cropImage.value = canvas.toDataURL()
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="图片裁剪">
      <template #content>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add cropperjs</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/fengyuanchen/cropperjs')">
        <template #icon>
          <SvgIcon name="i-ep:link" />
        </template>
        访问 cropperjs
      </ElButton>
    </PageHeader>
    <PageMain>
      <div>
        <img ref="imageRef" src="@/assets/images/logo.png" class="block h-xl w-xl">
      </div>
      <HButton @click="onCrop">
        裁剪
      </HButton>
    </PageMain>
    <PageMain v-if="cropImage">
      <img :src="cropImage" class="block h-xs w-xs">
    </PageMain>
  </div>
</template>
