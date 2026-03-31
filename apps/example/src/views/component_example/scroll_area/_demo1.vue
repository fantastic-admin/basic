<script setup lang="ts">
const scrollbar = ref(true)
const mask = ref(false)
</script>

<template>
  <div class="flex-col-start gap-4">
    <div class="flex-col-start gap-4">
      <div class="flex-center-start gap-4">
        <div class="text-sm">
          显示滚动条
        </div>
        <FaSwitch v-model="scrollbar" />
      </div>
      <div class="flex-center-start gap-4">
        <div class="text-sm">
          显示遮罩
        </div>
        <FaSwitch v-model="mask" />
      </div>
    </div>
    <FaScrollArea :scrollbar :mask class="border rounded-md h-72 w-48">
      <div v-for="tag in 20" :key="tag" class="text-sm p-4">
        {{ tag }}
      </div>
    </FaScrollArea>
    <FaScrollArea horizontal :scrollbar :mask class="border rounded-md w-96">
      <div class="flex-center-start">
        <div v-for="tag in 20" :key="tag" class="text-sm flex-center h-16 w-16">
          {{ tag }}
        </div>
      </div>
    </FaScrollArea>
  </div>
</template>
