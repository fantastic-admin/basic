<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { ref } from 'vue'
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import FaTooltip from '../../tooltip/index.vue'
import FaInput from '../index.vue'

const value = ref('')
const value2 = ref('')
</script>

<template>
  <div class="flex flex-col gap-2">
    <FaInput v-model="value" placeholder="example.com" input-class="ps-1">
      <template #start>
        https://
      </template>
      <template #end>
        <FaTooltip text="可输入域名、IP、端口、URL 等">
          <FaIcon name="i-ri:question-line" class="text-base text-orange cursor-help" />
        </FaTooltip>
      </template>
    </FaInput>
    <FaInput v-model="value2" placeholder="请输入内容" align="block" input-class="shadow-none" end-class="justify-end">
      <template #start>
        标题：
      </template>
      <template #end>
        <FaButton variant="ghost" size="sm" class="px-2 h-8">
          提交
        </FaButton>
      </template>
    </FaInput>
  </div>
</template>
