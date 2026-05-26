<script setup lang="ts">
import { pagination } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="分页" description="FaPagination" />
    <FaPageMain
      v-for="example in pagination"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
