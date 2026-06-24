<script setup lang="ts">
import { kbd } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="键盘" description="FaKbd / FaKbdGroup" />
    <FaPageMain
      v-for="example in kbd"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
