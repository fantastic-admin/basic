<script setup lang="ts">
import { fileUpload } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="文件上传" description="FaFileUpload" />
    <FaPageMain
      v-for="example in fileUpload"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
