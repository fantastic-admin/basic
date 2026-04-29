<script setup lang="ts">
const checked = ref<'indeterminate' | boolean>('indeterminate')
</script>

<template>
  <FaCheckbox v-model="checked">
    部分选中
  </FaCheckbox>
</template>
