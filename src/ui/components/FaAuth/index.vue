<script setup lang="ts">
defineOptions({
  name: 'FaAuth',
})

const props = defineProps<{
  value: string | string[]
  all?: boolean
}>()

const isCheck = computed(() => {
  return props.all
    ? useAuth().authAll(typeof props.value === 'string' ? [props.value] : props.value)
    : useAuth().auth(props.value)
})
</script>

<template>
  <slot v-if="isCheck" />
  <slot v-else name="no-auth" />
</template>
