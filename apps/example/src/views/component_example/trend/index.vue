<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
import Demo3 from './_demo3.vue'
</script>

<template>
  <div>
    <FaPageHeader title="趋势标记">
      <template #description>
        <div class="space-y-2">
          <p>FaTrend</p>
          <p>标记上升和下降趋势。通常用绿色代表“好”，红色代表“不好”，股票涨跌场景除外</p>
        </div>
      </template>
    </FaPageHeader>
    <FaPageMain main-class="p-4">
      <Demo1 />
    </FaPageMain>
    <FaPageMain title="颜色反转" main-class="p-4">
      <Demo2 />
    </FaPageMain>
    <FaPageMain title="前缀后缀" main-class="p-4">
      <Demo3 />
    </FaPageMain>
  </div>
</template>
