<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
</script>

<template>
  <div>
    <FaPageHeader title="折叠面板" description="FaCollapsible" />
    <FaPageMain main-class="p-4">
      <Demo1 />
    </FaPageMain>
    <FaPageMain title="手动控制" main-class="p-4">
      <Demo2 />
    </FaPageMain>
  </div>
</template>
