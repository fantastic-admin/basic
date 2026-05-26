<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import { reactive } from 'vue'
import FaButton from '../../button/index.vue'
import FaInput from '../../input/index.vue'
import FaSelect from '../../select/index.vue'
import FaTextarea from '../../textarea/index.vue'
import FaLabel from '../index.vue'

const form = reactive({
  title: '',
  type: 'notice',
  description: '',
})

const typeOptions = [
  { label: '公告', value: 'notice' },
  { label: '消息', value: 'message' },
  { label: '任务', value: 'task' },
]
</script>

<template>
  <div class="max-w-xl space-y-4">
    <FaLabel label="标题" label-width="5rem">
      <FaInput v-model="form.title" placeholder="请输入标题" class="w-full" />
    </FaLabel>
    <FaLabel label="类型" label-width="5rem">
      <FaSelect v-model="form.type" :options="typeOptions" class="w-full" />
    </FaLabel>
    <FaLabel label="描述" label-width="5rem" class="items-start">
      <FaTextarea v-model="form.description" placeholder="请输入描述" class="w-full" />
    </FaLabel>
    <FaLabel label-width="5rem">
      <div class="flex gap-2">
        <FaButton>保存</FaButton>
        <FaButton variant="outline">
          重置
        </FaButton>
      </div>
    </FaLabel>
  </div>
</template>
