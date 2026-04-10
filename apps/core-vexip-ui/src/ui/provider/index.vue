<script setup lang="ts">
import { zhCNLocale } from 'vexip-ui'
</script>

<template>
  <VxpConfigProvider :locale="zhCNLocale()">
    <slot />
  </VxpConfigProvider>
</template>
