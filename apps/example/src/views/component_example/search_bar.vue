<script setup lang="ts">
import { searchBar } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="搜索面板" description="FaSearchBar" />
    <FaPageMain
      v-for="example in searchBar"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
