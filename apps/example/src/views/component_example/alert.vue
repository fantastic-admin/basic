<script setup lang="ts">
import { alert } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="提示" description="FaAlert" />
    <FaPageMain
      v-for="example in alert"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
