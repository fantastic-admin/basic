<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaCheckbox from '../index.vue'

type CheckboxValue = boolean | 'indeterminate' | undefined

const checked = shallowRef<CheckboxValue>('indeterminate')
</script>

<template>
  <FaCheckbox v-model="checked">
    部分选中
  </FaCheckbox>
</template>
