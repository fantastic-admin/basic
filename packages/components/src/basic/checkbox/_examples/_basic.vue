<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaCheckbox from '../index.vue'

type CheckboxValue = boolean | 'indeterminate' | undefined

const checked = shallowRef<CheckboxValue>(false)
</script>

<template>
  <FaCheckbox v-model="checked">
    同意协议
  </FaCheckbox>
</template>
