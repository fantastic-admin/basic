<script setup lang="ts">
import { tooltip } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="文字提示" description="FaTooltip" />
    <FaPageMain
      v-for="example in tooltip"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
