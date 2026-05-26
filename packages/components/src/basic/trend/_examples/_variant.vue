<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaTrend from '../index.vue'
</script>

<template>
  <div class="space-y-4">
    <div>
      <p class="text-sm text-muted-foreground mb-2">
        Default 风格
      </p>
      <div class="flex gap-2 items-center">
        <FaTrend value="12.3%" />
        <FaTrend value="12.3%" type="down" />
      </div>
    </div>
    <div>
      <p class="text-sm text-muted-foreground mb-2">
        Filled 风格
      </p>
      <div class="flex gap-2 items-center">
        <FaTrend value="+12.3%" variant="filled" />
        <FaTrend value="-12.3%" variant="filled" type="down" />
      </div>
    </div>
    <div>
      <p class="text-sm text-muted-foreground mb-2">
        Soft 风格
      </p>
      <div class="flex gap-2 items-center">
        <FaTrend value="12.3%" variant="soft" />
        <FaTrend value="12.3%" variant="soft" type="down" />
      </div>
    </div>
    <div>
      <p class="text-sm text-muted-foreground mb-2">
        Outline 风格
      </p>
      <div class="flex gap-2 items-center">
        <FaTrend value="12.3%" variant="outline" />
        <FaTrend value="12.3%" variant="outline" type="down" />
      </div>
    </div>
  </div>
</template>
