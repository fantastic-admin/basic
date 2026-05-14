<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
import Demo3 from './_demo3.vue'
</script>

<template>
  <div>
    <FaPageHeader title="提示" description="FaAlert" />
    <FaPageMain>
      <Demo1 />
    </FaPageMain>
    <FaPageMain title="不同样式">
      <Demo2 />
    </FaPageMain>
    <FaPageMain title="自定义描述">
      <Demo3 />
    </FaPageMain>
  </div>
</template>
