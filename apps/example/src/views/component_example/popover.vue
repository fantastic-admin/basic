<script setup lang="ts">
import { popover } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="浮动面板" description="FaPopover" />
    <FaPageMain
      v-for="example in popover"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
