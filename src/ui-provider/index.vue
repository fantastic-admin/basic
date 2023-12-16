<script setup lang="ts">
import zhCN from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>

<template>
  <ElConfigProvider :locale="zhCN" :button="{ autoInsertSpace: true }">
    <slot />
  </ElConfigProvider>
</template>
