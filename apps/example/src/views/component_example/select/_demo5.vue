<script setup lang="ts">
const modal = shallowRef(false)
const cityInFaModal = shallowRef('shanghai')

const options = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Shenzhen', value: 'shenzhen' },
]
</script>

<template>
  <div>
    <div class="flex gap-2">
      <FaButton @click="modal = true">
        打开 FaModal
      </FaButton>
    </div>
    <FaModal
      v-model="modal"
      title="FaModal 中的选择器"
      description="在模态框内容区内使用 FaSelect"
      :footer="false"
      class="sm:max-w-lg"
      content-class="min-h-auto"
    >
      <div class="py-4 flex flex-col gap-4">
        <FaSelect
          v-model="cityInFaModal"
          :options="options"
          placeholder="请选择城市"
          class="w-full"
        />
        <div class="text-sm text-muted-foreground">
          当前值：{{ cityInFaModal }}
        </div>
      </div>
    </FaModal>
  </div>
</template>
