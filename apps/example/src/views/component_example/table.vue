<script setup lang="ts">
import { table } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="表格" description="FaTable" />
    <FaPageMain
      v-for="example in table"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
