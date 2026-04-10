<script setup lang="ts">
defineOptions({
  name: 'AppAuth',
})

const props = defineProps<{
  value: string | string[]
  all?: boolean
}>()

const isCheck = computed(() => {
  return props.all
    ? useAppAuth().authAll(typeof props.value === 'string' ? [props.value] : props.value)
    : useAppAuth().auth(props.value)
})
</script>

<template>
  <slot v-if="isCheck" />
  <slot v-else name="no-auth" />
</template>
