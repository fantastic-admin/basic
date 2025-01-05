<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const testHeight = ref(50)
</script>

<template>
  <div>
    <FaPageHeader title="固定底部操作栏">
      <template #description>
        <div class="space-y-2">
          <p>FaFixedActionBar</p>
          <p>避免因页面过长，导致操作按钮需要滚动到页面底部才能操作</p>
        </div>
      </template>
    </FaPageHeader>
    <FaPageMain>
      <div class="h-500" />
    </FaPageMain>
    <FaFixedActionBar>
      <div :style="`height: ${testHeight}px;`" />
      <ElSlider v-model="testHeight" />
    </FaFixedActionBar>
  </div>
</template>
