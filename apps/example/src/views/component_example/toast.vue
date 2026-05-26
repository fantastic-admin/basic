<script setup lang="ts">
import { toast } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="轻提示" description="FaToast" />
    <FaPageMain
      v-for="example in toast"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
