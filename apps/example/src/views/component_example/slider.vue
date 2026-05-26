<script setup lang="ts">
import { slider } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="滑块" description="FaSlider" />
    <FaPageMain
      v-for="example in slider"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
