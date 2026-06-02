<script setup lang="ts">
import { badge } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="徽章" description="FaBadge" />
    <FaPageMain
      v-for="example in badge"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
