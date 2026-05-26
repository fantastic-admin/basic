<script setup lang="ts">
import { contextMenu } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="右键菜单" description="FaContextMenu" />
    <FaPageMain
      v-for="example in contextMenu"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
