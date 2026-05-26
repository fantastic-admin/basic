<script setup lang="ts">
import { pageHeader } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="页头" description="FaPageHeader" />
    <FaPageMain
      v-for="example in pageHeader"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
