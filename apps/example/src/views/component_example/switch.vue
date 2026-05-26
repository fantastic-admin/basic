<script setup lang="ts">
import { switch as switchExamples } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="开关" description="FaSwitch" />
    <FaPageMain
      v-for="example in switchExamples"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
