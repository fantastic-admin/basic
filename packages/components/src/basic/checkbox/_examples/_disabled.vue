<script setup lang="ts">
import { shallowRef } from 'vue'

// 组件实际使用时无需手动导入，框架会自动导入
import FaCheckbox from '../index.vue'

type CheckboxValue = boolean | 'indeterminate' | undefined

const unchecked = shallowRef<CheckboxValue>(false)
const checked = shallowRef<CheckboxValue>(true)
</script>

<template>
  <div class="flex flex-col gap-3">
    <FaCheckbox v-model="unchecked" disabled>
      禁用未选中
    </FaCheckbox>
    <FaCheckbox v-model="checked" disabled>
      禁用已选中
    </FaCheckbox>
  </div>
</template>
