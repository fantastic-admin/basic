<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <div>
    <FaPageHeader title="浮动面板" description="FaPopover" />
    <FaPageMain main-class="flex gap-4">
      <FaPopover>
        <FaButton>
          浮动面板
          <FaIcon name="i-ep:caret-bottom" />
        </FaButton>
        <template #panel>
          <div class="h-30 w-60 flex items-center justify-center">
            面板内容
          </div>
        </template>
      </FaPopover>
      <FaPopover v-model:open="open">
        <FaButton>
          支持手动关闭
        </FaButton>
        <template #panel>
          <div class="h-30 w-60 flex items-center justify-center">
            <FaButton @click="open = false">
              关闭
            </FaButton>
          </div>
        </template>
      </FaPopover>
    </FaPageMain>
  </div>
</template>
