<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
</script>

<template>
  <div>
    <FaPageHeader title="数字输入框" description="FaInput" />
    <FaPageMain main-class="p-4">
      <Demo1 />
    </FaPageMain>
    <FaPageMain title="最小值 / 最大值 / 步长" main-class="p-4">
      <Demo2 />
    </FaPageMain>
  </div>
</template>
