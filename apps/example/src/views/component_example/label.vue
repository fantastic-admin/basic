<script setup lang="ts">
import { label } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="标签" description="FaLabel" />
    <FaPageMain
      v-for="example in label"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
