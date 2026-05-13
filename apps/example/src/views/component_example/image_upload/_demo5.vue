<script setup lang="ts">
const files = ref<string[]>([])

function beforeUpload(file: File) {
  return file.type.startsWith('image/')
}

async function httpRequest({ file, onProgress }: {
  file: File
  onProgress: (percent: number) => void
}) {
  onProgress(50)
  await new Promise(resolve => setTimeout(resolve, 200))
  onProgress(100)

  return {
    url: URL.createObjectURL(file),
    name: file.name,
  }
}
</script>

<template>
  <FaImageUpload
    v-model="files"
    directory
    :max="0"
    :http-request="httpRequest"
    :before-upload="beforeUpload"
    :after-upload="response => response.url"
  />
</template>
