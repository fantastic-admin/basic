<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
</script>

<template>
  <div>
    <FaPageHeader title="文本域" description="FaTextarea" />
    <FaPageMain main-class="p-4">
      <Demo1 />
    </FaPageMain>
    <FaPageMain title="插槽" main-class="p-4">
      <Demo2 />
    </FaPageMain>
  </div>
</template>
