<script setup lang="ts">
import { form } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="表单" description="FaForm / FaFormItem" />
    <FaPageMain
      v-for="example in form"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
