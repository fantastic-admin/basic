<script setup lang="ts">
import { avatar } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="头像" description="FaAvatar" />
    <FaPageMain
      v-for="example in avatar"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
