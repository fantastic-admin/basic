<script setup lang="ts">
import { scrollArea } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="滚动区域" description="FaScrollArea" />
    <FaPageMain
      v-for="example in scrollArea"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
