<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
import Demo3 from './_demo3.vue'
</script>

<template>
  <div>
    <FaPageHeader title="图片上传" description="FaImageUpload" />
    <FaPageMain main-class="p-0">
      <div class="p-4">
        <Demo1 />
      </div>
    </FaPageMain>
    <FaPageMain title="多图上传" main-class="p-0">
      <div class="p-4">
        <Demo2 />
      </div>
    </FaPageMain>
    <FaPageMain title="自定义默认内容、容器大小、建议尺寸、限制类型、不限制数量" main-class="p-0">
      <div class="p-4">
        <Demo3 />
      </div>
    </FaPageMain>
  </div>
</template>
