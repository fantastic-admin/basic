<script setup lang="ts">
import { descriptions } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="描述列表" description="FaDescriptions" />
    <FaPageMain
      v-for="example in descriptions"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
