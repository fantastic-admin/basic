<script setup lang="ts">
const switchVal = ref(false)

function handleBeforeChange() {
  return new Promise<boolean>((resolve) => {
    useFaModal().confirm({
      title: '确认信息',
      content: '确认吗？',
      onConfirm: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      },
    })
  })
}
</script>

<template>
  <div class="flex gap-4">
    <FaSwitch v-model="switchVal" :before-change="handleBeforeChange" />
  </div>
</template>
