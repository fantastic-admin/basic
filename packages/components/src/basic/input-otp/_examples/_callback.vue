<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import { useToast } from '../../toast'
import FaInputOTP from '../index.vue'

const input = ref('')
const inputText = ref('等待输入')
const completeText = ref('等待完成')
const toast = useToast()

function handleInput(value: string) {
  inputText.value = `input: ${value || '空值'}`
}

function handleComplete(value: string) {
  completeText.value = `complete: ${value}`
  toast(value)
}
</script>

<template>
  <div class="space-y-3">
    <FaInputOTP v-model="input" @input="handleInput" @complete="handleComplete" />
    <div class="text-sm text-muted-foreground space-y-1">
      <div>{{ inputText }}</div>
      <div>{{ completeText }}</div>
    </div>
  </div>
</template>
