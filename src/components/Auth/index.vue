<script setup lang="ts">
defineOptions({
  name: 'Auth',
})

const props = defineProps<{
  value: string | string[]
  all?: boolean
}>()

const auth = useAuth()

function check() {
  return props.all
    ? auth.authAll(typeof props.value === 'string' ? [props.value] : props.value)
    : auth.auth(props.value)
}
</script>

<template>
  <slot v-if="check()" />
  <slot v-else name="no-auth" />
</template>
