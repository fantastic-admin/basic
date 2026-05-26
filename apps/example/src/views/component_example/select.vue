<script setup lang="ts">
import { select } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="选择器" description="FaSelect" />
    <FaPageMain
      v-for="example in select"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
