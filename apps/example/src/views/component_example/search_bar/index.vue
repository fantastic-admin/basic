<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
import Demo3 from './_demo3.vue'
import Demo4 from './_demo4.vue'
import Demo5 from './_demo5.vue'
import Demo6 from './_demo6.vue'
</script>

<template>
  <div>
    <FaPageHeader title="搜索面板" description="FaSearchBar" />
    <FaPageMain main-class="p-0">
      <div class="p-4">
        <Demo1 />
      </div>
    </FaPageMain>
    <FaPageMain title="默认展开" main-class="p-0">
      <div class="p-4">
        <Demo2 />
      </div>
    </FaPageMain>
    <FaPageMain title="显示背景" main-class="p-0">
      <div class="p-4">
        <Demo3 />
      </div>
    </FaPageMain>
    <FaPageMain title="切换事件" main-class="p-0">
      <div class="p-4">
        <Demo4 />
      </div>
    </FaPageMain>
    <FaPageMain title="自定义切换按钮（搭配自定义 grid 布局）" main-class="p-0">
      <div class="p-4">
        <Demo5 />
      </div>
    </FaPageMain>
    <FaPageMain title="自定义切换按钮（搭配 el-row 组件）" main-class="p-0">
      <div class="p-4">
        <Demo6 />
      </div>
    </FaPageMain>
  </div>
</template>
