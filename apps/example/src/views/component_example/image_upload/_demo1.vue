<script setup lang="ts">
const files = ref<string[]>([])

function handleSuccess() {
  faToast.success('模拟上传成功')
}
</script>

<template>
  <FaImageUpload
    v-model="files"
    action="/fake/upload"
    :after-upload="(response) => response.data.url"
    @on-success="handleSuccess"
  />
</template>
