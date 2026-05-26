<script setup lang="ts">
import { inputOtp } from '@fantastic-admin/components/examples'
</script>

<template>
  <div>
    <FaPageHeader title="一次性密码输入框" description="FaInputOTP" />
    <FaPageMain
      v-for="example in inputOtp"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
