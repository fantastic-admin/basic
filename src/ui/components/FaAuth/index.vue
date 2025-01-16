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
  <div class="contents">
    <slot v-if="isCheck" />
    <slot v-else name="no-auth" />
  </div>
</template>
