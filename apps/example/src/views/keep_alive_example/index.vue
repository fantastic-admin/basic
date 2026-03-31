<script setup lang="ts">
defineOptions({
  name: 'KeepAliveExample',
})

const text = ref('')
</script>

<template>
  <div>
    <FaPageHeader title="页面保活" />
    <FaPageMain title="该页面将始终保持活跃，重新回到该页面时，输入框中的内容将不会被重置">
      <FaInput v-model="text" placeholder="输入点什么" />
    </FaPageMain>
  </div>
</template>
