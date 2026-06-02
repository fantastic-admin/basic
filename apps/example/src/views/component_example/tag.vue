<script setup lang="ts">
import { tag } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="标签" description="FaTag" />
    <FaPageMain
      v-for="example in tag"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
