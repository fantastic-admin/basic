<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaIcon from '../../icon/index.vue'
import FaImagePreview from '../index.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FaImagePreview src="https://fantastic-admin.hurui.me/not-found.png" />
    <FaImagePreview src="https://fantastic-admin.hurui.me/not-found.png">
      <template #error>
        <div class="text-sm text-secondary-foreground/50 flex-col-center gap-1">
          <FaIcon name="i-ph:image-broken-duotone" class="size-8" />
          <div>
            图片加载失败
          </div>
        </div>
      </template>
    </FaImagePreview>
  </div>
</template>
