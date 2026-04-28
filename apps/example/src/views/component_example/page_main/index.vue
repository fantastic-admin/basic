<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
import Demo3 from './_demo3.vue'
import Demo4 from './_demo4.vue'
</script>

<template>
  <div>
    <FaPageHeader title="内容块" description="FaPageMain" />
    <FaPageMain main-class="p-4">
      <Demo1 />
    </FaPageMain>
    <FaPageMain main-class="p-4">
      <Demo2 />
    </FaPageMain>
    <FaPageMain main-class="p-4">
      <Demo3 />
    </FaPageMain>
    <FaPageMain main-class="p-4">
      <Demo4 />
    </FaPageMain>
  </div>
</template>
