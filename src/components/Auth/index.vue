<script setup lang="ts">
const props = defineProps<{
  value: string | string[]
}>()

defineOptions({
  name: 'Auth',
})

function check() {
  return useAuth().auth(props.value)
}
</script>

<template>
  <div>
    <slot v-if="check()" />
    <slot v-else name="no-auth" />
  </div>
</template>
