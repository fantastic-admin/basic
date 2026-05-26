<script setup lang="ts">
import { buttonGroup } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="按钮组" description="FaButtonGroup" />
    <FaPageMain
      v-for="example in buttonGroup"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
