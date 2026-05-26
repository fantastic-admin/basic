<script setup lang="ts">
import { drawer } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="抽屉" description="FaDrawer" />
    <FaPageMain
      v-for="example in drawer"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
