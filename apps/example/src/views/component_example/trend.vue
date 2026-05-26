<script setup lang="ts">
import { trend } from '@fantastic-admin/components/examples'
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
    <FaPageMain
      v-for="example in trend"
      :key="example.title"
      :code="example.componentRaw"
      :title="example.title"
    >
      <component :is="example.component" />
    </FaPageMain>
  </div>
</template>
