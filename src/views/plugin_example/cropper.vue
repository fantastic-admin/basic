<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import Cropper from 'cropperjs'
import Alert from './components/alert.vue'
import Command from './components/command.vue'
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
    <FaPageHeader title="图片裁剪">
      <template #description>
        <p>
          安装命令：
          <Command text="pnpm add cropperjs" />
        </p>
      </template>
      <FaButton variant="outline" @click="open('https://github.com/fengyuanchen/cropperjs')">
        <FaIcon name="i-ep:link" />
        访问 cropperjs
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <div class="space-y-2">
        <img ref="imageRef" src="@/assets/images/logo.svg" class="block h-xl w-xl">
        <FaButton @click="onCrop">
          裁剪
        </FaButton>
      </div>
    </FaPageMain>
    <FaPageMain v-if="cropImage">
      <img :src="cropImage" class="block h-xs w-xs">
    </FaPageMain>
  </div>
</template>
