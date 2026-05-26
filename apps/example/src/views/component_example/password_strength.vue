<script setup lang="ts">
import { passwordStrength } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="密码强度" description="FaPasswordStrength" />
    <FaPageMain
      v-for="example in passwordStrength"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
