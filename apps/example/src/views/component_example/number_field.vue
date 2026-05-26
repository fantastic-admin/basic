<script setup lang="ts">
import { numberField } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="数字输入框" description="FaNumberField" />
    <FaPageMain
      v-for="example in numberField"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
