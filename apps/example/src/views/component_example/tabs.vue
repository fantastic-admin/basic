<script setup lang="ts">
import { tabs } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="标签页" description="FaTabs" />
    <FaPageMain
      v-for="example in tabs"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
