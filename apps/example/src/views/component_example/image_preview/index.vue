<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
import Demo3 from './_demo3.vue'
</script>

<template>
  <div>
    <FaPageHeader title="图片预览" description="FaImagePreview" />
    <FaPageMain main-class="p-4">
      <Demo1 />
    </FaPageMain>
    <FaPageMain title="函数式调用" main-class="p-4">
      <Demo2 />
    </FaPageMain>
    <FaPageMain title="在 FaModal 里展示" main-class="p-4">
      <Demo3 />
    </FaPageMain>
  </div>
</template>
