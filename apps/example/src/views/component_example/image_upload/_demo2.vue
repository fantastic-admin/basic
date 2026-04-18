<script setup lang="ts">
const files = ref<string[]>(['https://fantastic-admin.hurui.me/logo.svg'])

function handleSuccess() {
  faToast.success('模拟上传成功')
}
</script>

<template>
  <FaImageUpload
    v-model="files"
    action="/fake/upload"
    :after-upload="(response) => `${response.data.url}?fake=${Math.random()}`"
    :max="2"
    @on-success="handleSuccess"
  />
</template>
