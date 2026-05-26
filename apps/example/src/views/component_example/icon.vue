<script setup lang="ts">
import { icon } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="图标" description="FaIcon" />
    <FaPageMain
      v-for="example in icon"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
