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
    {{ text }}
  </FaKbd>
</template>
