<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const drawer = ref(false)
</script>

<template>
  <div>
    <FaPageHeader title="抽屉" description="FaDrawer" />
    <FaPageMain>
      <FaButton @click="drawer = true">
        打开
      </FaButton>
      <FaDrawer v-model="drawer" title="标题" description="这里是一段描述介绍">
        这里是 drawer 内容
      </FaDrawer>
    </FaPageMain>
  </div>
</template>
