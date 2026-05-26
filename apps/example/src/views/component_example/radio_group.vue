<script setup lang="ts">
import { radioGroup } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="单选组" description="FaRadioGroup" />
    <FaPageMain
      v-for="example in radioGroup"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
