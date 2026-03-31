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
    <FaPageHeader title="Cropper">
      <template #description>
        <Command text="pnpm add cropperjs@1.6.2" />
      </template>
      <FaButton variant="outline" size="icon" @click="open('https://github.com/fengyuanchen/cropperjs')">
        <FaIcon name="i-simple-icons:github" />
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <div class="space-y-2">
        <img ref="imageRef" src="@/assets/images/logo.svg" class="size-xl block">
        <FaButton @click="onCrop">
          裁剪
        </FaButton>
      </div>
    </FaPageMain>
    <FaPageMain v-if="cropImage">
      <img :src="cropImage" class="size-[100px] block">
    </FaPageMain>
  </div>
</template>
