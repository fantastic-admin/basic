<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
import Demo3 from './_demo3.vue'
import Demo4 from './_demo4.vue'
import Demo5 from './_demo5.vue'
</script>

<template>
  <div>
    <FaPageHeader title="文件上传" description="FaFileUpload" />
    <FaPageMain main-class="p-4">
      <Demo1 />
    </FaPageMain>
    <FaPageMain title="限制上传数量、大小、类型、点击事件" main-class="p-4">
      <Demo2 />
    </FaPageMain>
    <FaPageMain title="自定义显示" main-class="p-4">
      <Demo3 />
    </FaPageMain>
    <FaPageMain title="自定义上传请求" main-class="p-4">
      <Demo4 />
    </FaPageMain>
    <FaPageMain title="文件夹上传" main-class="p-4">
      <Demo5 />
    </FaPageMain>
  </div>
</template>
