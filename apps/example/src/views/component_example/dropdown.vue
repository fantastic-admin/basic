<script setup lang="ts">
import { dropdown } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="下拉菜单" description="FaDropdown" />
    <FaPageMain
      v-for="example in dropdown"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
