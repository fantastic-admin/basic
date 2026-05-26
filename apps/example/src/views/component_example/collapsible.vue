<script setup lang="ts">
import { collapsible } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="折叠面板" description="FaCollapsible" />
    <FaPageMain
      v-for="example in collapsible"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
