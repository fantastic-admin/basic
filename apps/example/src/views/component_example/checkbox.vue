<script setup lang="ts">
import { checkbox } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="复选框" description="FaCheckbox / FaCheckboxGroup" />
    <FaPageMain
      v-for="example in checkbox"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
