<script setup lang="ts">
import { pageMain } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="内容块" description="FaPageMain" />
    <FaPageMain
      v-for="example in pageMain"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
