<script setup lang="ts">
import { hoverCard } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="悬浮卡片" description="FaHoverCard" />
    <FaPageMain
      v-for="example in hoverCard"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
