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
    :width="200"
    :height="130"
    :dimension="{ width: 400, height: 260 }"
    :ext="['png']"
    :size="200 * 1024"
    :max="0"
    @on-success="handleSuccess"
  >
    <FaIcon name="i-noto:identification-card" class="opacity-50 size-50" />
  </FaImageUpload>
</template>
