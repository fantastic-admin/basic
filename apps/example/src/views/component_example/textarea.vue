<script setup lang="ts">
import { textarea } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="文本域" description="FaTextarea" />
    <FaPageMain
      v-for="example in textarea"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
