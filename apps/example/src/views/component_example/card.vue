<script setup lang="ts">
import { card } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="卡片" description="FaCard" />
    <FaPageMain
      v-for="example in card"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
