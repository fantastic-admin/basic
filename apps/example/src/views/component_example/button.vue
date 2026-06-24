<script setup lang="ts">
import { button } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="按钮" description="FaButton / FaButtonGroup" />
    <FaPageMain
      v-for="example in button"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
