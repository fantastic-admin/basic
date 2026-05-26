<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaKbd from '../../kbd/index.vue'
import FaKbdGroup from '../index.vue'
</script>

<template>
  <div class="flex flex-col gap-2">
    <FaKbdGroup>
      <FaKbd>⌘</FaKbd>
      <FaKbd>⇧</FaKbd>
      <FaKbd>K</FaKbd>
    </FaKbdGroup>
    <FaKbdGroup>
      <FaKbd>Ctrl</FaKbd>
      <FaKbd>Alt</FaKbd>
      <FaKbd>Delete</FaKbd>
    </FaKbdGroup>
  </div>
</template>
