<script setup lang="ts">
import { checkboxGroup } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="复选框组" description="FaCheckboxGroup" />
    <FaPageMain
      v-for="example in checkboxGroup"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
