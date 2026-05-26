<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaCheckbox from '../index.vue'

type CheckboxValue = boolean | 'indeterminate' | undefined

const checked = shallowRef<CheckboxValue>(true)
</script>

<template>
  <FaCheckbox
    v-model="checked"
    class="px-3 py-2 border border-primary/20 rounded-lg bg-primary/5 gap-3"
    item-class="size-5 rounded-md border-primary"
    label-class="text-primary font-medium w-full"
  >
    开启精细化配置
  </FaCheckbox>
</template>
