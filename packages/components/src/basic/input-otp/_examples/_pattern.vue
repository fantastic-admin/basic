<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaInputOTP from '../index.vue'

const chars = ref('')
const digits = ref('')
const digitsAndChars = ref('')
const custom = ref('')
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <div class="text-sm text-muted-foreground">
        仅字母
      </div>
      <FaInputOTP v-model="chars" pattern="only-chars" />
    </div>
    <div class="space-y-2">
      <div class="text-sm text-muted-foreground">
        仅数字
      </div>
      <FaInputOTP v-model="digits" pattern="only-digits" />
    </div>
    <div class="space-y-2">
      <div class="text-sm text-muted-foreground">
        字母和数字
      </div>
      <FaInputOTP v-model="digitsAndChars" pattern="only-digits-and-chars" />
    </div>
    <div class="space-y-2">
      <div class="text-sm text-muted-foreground">
        自定义：仅允许 A-F 和 0-9
      </div>
      <FaInputOTP v-model="custom" pattern="^[A-F0-9]*$" />
    </div>
  </div>
</template>
