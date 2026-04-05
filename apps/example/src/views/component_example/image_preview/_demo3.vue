<script setup lang="ts">
const modal = ref(false)
</script>

<template>
  <div>
    <FaButton @click="modal = true">
      打开
    </FaButton>
    <FaModal
      v-model="modal"
      title="FaModal 中的图片预览"
      description="点击图片后仍可继续进入全屏预览"
      :footer="false"
      class="sm:max-w-3xl"
      content-class="min-h-auto"
    >
      <div class="py-4 flex-center">
        <FaImagePreview src="https://fantastic-admin.hurui.me/logo.svg" />
      </div>
    </FaModal>
  </div>
</template>
