<script setup lang="ts">
import { input } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="输入框" description="FaInput" />
    <FaPageMain
      v-for="example in input"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
