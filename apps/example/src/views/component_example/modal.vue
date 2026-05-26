<script setup lang="ts">
import { modal } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="弹窗" description="FaModal" />
    <FaPageMain
      v-for="example in modal"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
