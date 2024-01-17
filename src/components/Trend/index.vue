<script setup lang="ts">
defineOptions({
  name: 'Trend',
})

const props = withDefaults(
  defineProps<{
    value: string
    type?: 'up' | 'down'
    prefix?: string
    suffix?: string
    reverse?: boolean
  }>(),
  {
    type: 'up',
    prefix: '',
    suffix: '',
    reverse: false,
  },
)

const isUp = computed(() => {
  let isUp = props.type === 'up'
  if (props.reverse) {
    isUp = !isUp
  }
  return isUp
})
</script>

<template>
  <div class="flex items-center transition" :class="`${isUp ? 'c-green' : 'c-red'}`">
    <span v-if="prefix" class="prefix">{{ prefix }}</span>
    <span class="text">{{ value }}</span>
    <span v-if="suffix" class="suffix">{{ suffix }}</span>
    <SvgIcon name="i-ep:caret-top" :rotate="isUp ? 0 : 180" class="ml-1 transition" />
  </div>
</template>
