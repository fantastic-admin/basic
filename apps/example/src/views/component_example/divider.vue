<script setup lang="ts">
import { divider } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="分割线" description="FaDivider" />
    <FaPageMain
      v-for="example in divider"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
