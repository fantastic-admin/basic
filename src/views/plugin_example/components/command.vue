<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { toast } from 'vue-sonner'

const props = defineProps<{
  text: string
}>()

const { copy, copied, isSupported } = useClipboard()

watch(copied, (val) => {
  if (val) {
    toast.success('复制成功', {
      position: 'top-center',
    })
  }
})
</script>

<template>
  <FaKbd class="mx-1 cursor-pointer" @click="isSupported && copy(props.text)">
    <FaIcon name="i-lucide:copy" class="size-3" />
    {{ text }}
  </FaKbd>
</template>
