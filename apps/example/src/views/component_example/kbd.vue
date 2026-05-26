<script setup lang="ts">
import { kbd, kbdGroup } from '@fantastic-admin/components/examples'

const examples = [
  ...kbd,
  ...kbdGroup.map(example => ({
    ...example,
    title: '组合',
  })),
]
</script>

<template>
  <div>
    <FaPageHeader title="键盘" description="FaKbd" />
    <FaPageMain
      v-for="example in examples"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
