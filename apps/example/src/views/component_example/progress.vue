<script setup lang="ts">
import { progress } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="进度条" description="FaProgress" />
    <FaPageMain
      v-for="example in progress"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
