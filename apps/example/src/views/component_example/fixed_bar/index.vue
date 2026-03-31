<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
</script>

<template>
  <div>
    <FaPageHeader title="固定栏">
      <template #description>
        <div class="space-y-2">
          <p>FaFixedBar</p>
          <p>固定在页面顶部或底部，可用于展示页面信息、操作按钮等</p>
        </div>
      </template>
    </FaPageHeader>
    <FaPageMain title="固定在页面顶部" main-class="p-0">
      <div class="p-4">
        <Demo1 />
      </div>
    </FaPageMain>
    <FaPageMain title="固定在页面底部" main-class="p-0">
      <div class="p-4">
        <Demo2 />
      </div>
    </FaPageMain>
    <FaPageMain class="h-vh" />
  </div>
</template>
