<script setup lang="ts">
import { imageUpload } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="图片上传" description="FaImageUpload" />
    <FaPageMain
      v-for="example in imageUpload"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
