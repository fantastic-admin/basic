<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <FaPopover v-model:open="open">
    <FaButton>
      浮动面板
      <FaIcon name="i-ep:caret-bottom" />
    </FaButton>
    <template #panel>
      <div class="flex h-30 w-60 items-center justify-center">
        <FaButton @click="open = false">
          关闭
        </FaButton>
      </div>
    </template>
  </FaPopover>
</template>
