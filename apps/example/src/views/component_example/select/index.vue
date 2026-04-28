<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
import Demo3 from './_demo3.vue'
import Demo4 from './_demo4.vue'
import Demo5 from './_demo5.vue'
</script>

<template>
  <div>
    <FaPageHeader title="选择器" description="FaSelect" />
    <FaPageMain main-class="p-4">
      <Demo1 />
    </FaPageMain>
    <FaPageMain title="组" main-class="p-4">
      <Demo2 />
    </FaPageMain>
    <FaPageMain title="多选" main-class="p-4">
      <Demo3 />
    </FaPageMain>
    <FaPageMain title="定位模式" main-class="p-4">
      <Demo4 />
    </FaPageMain>
    <FaPageMain title="在 FaModal 里展示" main-class="p-4">
      <Demo5 />
    </FaPageMain>
  </div>
</template>
