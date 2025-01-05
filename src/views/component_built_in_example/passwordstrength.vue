<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const password = ref('')
</script>

<template>
  <div>
    <FaPageHeader title="密码强度" description="FaPasswordStrength" />
    <FaPageMain>
      <div class="w-80 flex-col">
        <FaInput v-model="password" placeholder="请输入密码" class="w-full" />
        <FaPasswordStrength :password="password" class="mt-2" />
      </div>
    </FaPageMain>
  </div>
</template>
